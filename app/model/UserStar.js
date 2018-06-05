/**
 * 支持
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = new mongoose.Schema({
        _creatorId: String,
        creator: Object,
        _starId: String,
        star: Object,
        type: String,
        createAt: Date,
    });
    return mongoose.model('UserStar', Schema, 'ey_user_stars');
};