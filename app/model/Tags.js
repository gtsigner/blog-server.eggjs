//标签
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = new mongoose.Schema({
        //绑定
        _boundId: String,
        boundObject: Object,
        _creatorId: String,
        creator: String,

        name: String,
        type: String,
        createAt: Date,
        updateAt: Date,
        //计数器
        counter: {
            useCount: {
                default: 0,
                type: Number
            },
            searchCount: {
                default: 0,
                type: Number
            }
        },
        sort: Number,
        status: Number,//状态
    });
    const model = mongoose.model('Tags', Schema, 'ey_tags');
    return model;
};