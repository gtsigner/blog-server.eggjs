'use strict';
module.exports = app => {
    const {router, controller, middleware, io} = app;

    const oauth = middleware.oauth();
    const auth = middleware.auth();
//#region api
    //用户组
    router.resources('oauth', '/api/v1/oauth', controller.api.oauth);

    //Login
    router.post('/api/v1/portal/login', 'api.portal.login');
    router.post('/api/v1/portal/register', 'api.portal.register');
    //router.post('/api/v1/portal/sendSmsCode', 'api.portal.sendSmsCode');
    router.post('/api/v1/portal/logout', 'api.portal.logout');

    router.get('/api/v1/my/profile', auth, 'api.my.profile');

    router.get('/api/v1/posts', 'api.posts.index');
    router.get('/api/v1/post/:id/show', 'api.posts.show');


    router.get('/api/v1/posts/drafts', auth, 'api.posts.drafts');
    router.post('/api/v1/posts/create', auth, 'api.posts.create');
    router.put('/api/v1/post/:id/publish', auth, 'api.posts.publish');

    //users
    router.get('/api/v1/user/list', 'api.user.list');

    //game
    router.post('/api/v1/upload/image', auth, 'api.upload.image');
    router.post('/api/v1/upload/editor', auth, 'api.upload.editor');

    //#endregion    IO
};
