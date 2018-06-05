module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = new mongoose.Schema({
    _creatorId: String,
    creator: Object,
    _categoryId: String,//分类Id
    _tagsIds: [String],
    //标题
    title: String,
    //摘要
    desc: String,
    //内容
    content: String,
    //标签
    tags: {
      type: [String],
      default: []
    },
    //当前版本
    version: String,
    //创建日期
    createAt: {
      type: Date,
      default: Date.now()
    },
    //更新日期
    updateAt: {
      type: Date,
      default: Date.now(),
    },
    //图片库
    pics: [String],
    //计数
    counter: {
      star: {
        type: Number,
        default: 0
      },
      view: {
        type: Number,
        default: 0
      }
    },
    //是否发布
    published: {
      type: Boolean,
      default: false
    },//是否已经发布，如果未发布就放置到草稿箱里面
    //广告位
    positions: [String],
    status: Number,//状态
  });
  const model = mongoose.model('Posts', Schema, 'ey_posts');
  return model;
};
