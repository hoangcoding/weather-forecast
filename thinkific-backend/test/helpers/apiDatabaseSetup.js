const mongoose = require('mongoose');
require('dotenv').config({
  path: '.env.test',
});

mongoose.set('useCreateIndex', true);
mongoose.promise = Promise;

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  // eslint-disable-next-line no-restricted-syntax
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    // eslint-disable-next-line no-await-in-loop
    await collection.deleteMany();
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  // eslint-disable-next-line no-restricted-syntax
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      // eslint-disable-next-line no-await-in-loop
      await collection.drop();
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === 'ns not found') return;
      if (error.message.includes('a background operation is currently running')) return;
      console.log(error.message);
    }
  }
}

module.exports = {
  setupDB(clearAfterTest = true) {
    // Connect to Mongoose
    // eslint-disable-next-line no-undef
    beforeAll(async () => {
      const url = process.env.MONGO_URI || 'mongodb+srv://test:test@cluster0-3u6yo.mongodb.net/test?retryWrites=true&w=majority';
      await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    // Cleans up database between each test
    // eslint-disable-next-line no-undef
    if (clearAfterTest === true) {
      afterEach(async () => {
        await removeAllCollections();
      });
    }

    // Disconnect Mongoose
    // eslint-disable-next-line no-undef
    afterAll(async () => {
      await dropAllCollections();
      await mongoose.connection.close();
    });
  },
};
