'use strict';

const {app, assert} = require('egg-mock/bootstrap');

describe('test/app/extend/helper.test.js', () => {
  it('should assert', function* () {
    const ctx = app.mockContext({});

    for (let i = 0; i < 100; i++) {
      let randImgStr = ctx.helper.createDefaultHeadImg();
      assert(randImgStr);
    }
  });
});
