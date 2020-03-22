const superTest = require('supertest');
const app = require('../../src/app');
require('dotenv').config({
  path: '.env.test',
});

class ApiTest {
  constructor() {
    this.apiServer = superTest(app);
  }
}
module.exports = ApiTest;
