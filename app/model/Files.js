module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = new mongoose.Schema({
    _creatorId: String,
    name: String,
    filename: String,
    mime: String,
    mimeType: String,
    ossResult: Object,
    url: String,
    styleUrls: Object,
    createAt: {
      type: Date,
      default: Date.now()
    },
    status: Number
  });
  const model = mongoose.model('Files', Schema, 'ey_files');
  return model;
};
