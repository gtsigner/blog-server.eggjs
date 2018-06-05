module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = new mongoose.Schema({
        username: String,
        nickname: String,
        phone: {
            type: String,
            length: 11
        },
        password: String,
        email: String,
        alias: Array,//匿名登陆信息
        from: Object,
        avatar: String,
        sex: Number,
        createAt: Date,
        lock: Boolean,//加锁
        credit: {
            score: Number,//信誉积分
        },
        counter: {
            goods: {
                default: 0,
                type: Number
            },
            ordered: {
                default: 0,
                type: Number
            },
            follower: {
                default: 0,
                type: Number
            },
            posts: {
                default: 0,
                type: Number,
            },
            following: {
                default: 0,
                type: Number
            },
            collect: {
                default: 0,
                type: Number
            },
        },
        accessToken: String,
        status: Number,//状态
    });
    return mongoose.model('User', Schema, 'ey_users');
};