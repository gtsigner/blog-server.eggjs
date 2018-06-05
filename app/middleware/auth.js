module.exports = (option, app) => {
    return async function auth(ctx, next) {
        let accessToken = ctx.header['access-token'] || ctx.cookies.get('access_token') || ctx.session.access_token;
        let user = null;
        try {
            user = await ctx.service.user.getUserFromAccessToken(accessToken);
            delete user.password;
            ctx.user = user;
        } catch (ex) {
            user = null;
        }
        if (null === user) {
            ctx.body = {message: '请先登录后操作', code: 401};
            return ctx.status = 401;
        }
        await next();
    }
};
