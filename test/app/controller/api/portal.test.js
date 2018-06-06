'use strict';

const {app, assert} = require('egg-mock/bootstrap');

describe('test/app/controller/api/portal.test.js', () => {
  it('should assert', function* () {
    const pkg = require('../../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));
    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should status 200 and get the request body', () => {
    return app.httpRequest()
      .post('/api/v1/portal/register')
      .type('form')
      .send({
        username: 'zhaojun2',
        password: 'zhaojun',
        repassword: 'zhaojun'
      })
      .expect(200)
      .then((res) => {
        assert(1001 === res.body.code);
      });
  });
});
