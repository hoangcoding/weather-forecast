const { setupDB } = require('../../../../test/helpers/apiDatabaseSetup');
const ApiTest = require('../../../../test/helpers/apiTest');

const helper = new ApiTest();

describe('Authentication tests', () => {
  setupDB(false);
  let accessToken = '';
  let refreshToken = '';
  it('should register new account', async () => {
    const res = await registerNewAccount();
    expect(res.statusCode).toEqual(201);
    expect(res.headers).toHaveProperty('authorization');
    expect(res.body).toHaveProperty('email');
  });
  it('should login', async () => {
    const res = await login();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('email');
    accessToken = res.headers.authorization;
    refreshToken = res.headers['x-refresh-token'];
  });
  it('should refresh token', async () => {
    const res = await performRefreshToken(refreshToken, accessToken);
    expect(res.statusCode).toEqual(204);
    expect(res.headers.authorization).not.toBe(refreshToken);
    refreshToken = res.headers['x-refresh-token'];
    accessToken = res.headers.authorization;
  });
  it('should logout', async () => {
    const res = await logout(refreshToken, accessToken);
    expect(res.statusCode).toEqual(204);
  });
});

function registerNewAccount() {
  return helper.apiServer.post('/api/v1/user/register').send({
    email: 'test@test.com',
    password: '12345678',
    firstName: 'Steve',
    lastName: 'John',
  });
}

function login() {
  return helper.apiServer.post('/api/v1/user/login').send({
    email: 'test@test.com',
    password: '12345678',
  });
}

function performRefreshToken(refreshToken) {
  return helper.apiServer.post('/api/v1/user/refresh-token').send({
    refreshToken,
  });
}
function logout(refreshToken, accessToken) {
  return helper.apiServer.put('/api/v1/user/logout').send({
    refreshToken,
  }).set('Authorization', accessToken);
}
