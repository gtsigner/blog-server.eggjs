module.exports = app => {
    const mongoose = app.mongoose;
    const schema = new mongoose.Schema({
        title: String,
    });
    const model = mongoose.model('Category', schema, 'ey_categories');

    return model
};
