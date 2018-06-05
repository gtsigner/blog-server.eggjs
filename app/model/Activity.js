module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = new mongoose.Schema({
        _creatorId: mongoose.Schema.Types.ObjectId,
        creator: Object,
        _boundId: mongoose.Schema.Types.ObjectId,
        bound: Object,
        action: String,//'user.order.pay'
        type: String,
        createDate: Date,
        updateDate: Date,
        status: Number,//状态
    });
    return mongoose.model('Activity', Schema, 'ey_activities');
};
