'use strict';

const Controller = require('egg').Controller;
const Enums = require('../../extend/enums')

class PostsController extends Controller {
  async index() {
    const {ctx} = this;
    const params = ctx.request.query;
    const $where = {
      published: true
    };
    const $sort = {
      'counter.star': -1,
      updateAt: -1
    };
    const posts = await ctx.model.Post.find($where)
      .sort($sort)
      .skip(ctx.pager.skip)
      .limit(ctx.pager.limit)
      .exec();
    ctx.body = posts;
  }

  async create() {
    const {ctx} = this;
    let params = ctx.request.body;
    try {
      let draft = {
        _creatorId: ctx.user._id,
        creator: {
          _id: ctx.user._id,
          username: ctx.user.username,
          nickname: ctx.user.nickname,
          avatar: ctx.user.avatar
        },
        title: params.title,
        desc: params.desc || '',
        content: params.content || '',
        published: params.published,
        tags: [],
        createAt: Date.now(),
        updateAt: Date.now(),
        status: 0
      };
      draft = new ctx.model.Post(draft);
      await draft.save();
      ctx.body = draft;
    } catch (e) {
      ctx.body = {code: Enums.ApiCodes.FAIL}
    }
  }

  async show() {
    const {ctx} = this;
    let id = ctx.params.id;
    const post = await ctx.model.Post.findOne({_id: id, published: true});
    if (!post) {
      ctx.body = {code: Enums.ApiCodes.FAIL, message: '未找到文章'};
      ctx.status = 404;
    } else {
      ctx.body = post;
    }
  }

  async drafts() {
    const {ctx} = this;
    const posts = await ctx.model.Post.find({
      _creatorId: ctx.user._id,
      published: false,
      //status: 0
    }).sort({updateAt: -1}).exec();
    ctx.body = posts;
  }

  /**
   * 更新文档,然后迭代版本
   * @returns {Promise<void>}
   */
  async update() {
    const {ctx} = this;
    const id = ctx.params.id;
    const params = ctx.request.body;
    try {
      const post = await ctx.model.Post.findOne({
        _id: id,
        _creatorId: ctx.user._id
      });
      if (!post) throw new Error('未找到文章');
      post.updateAt = Date.now();
      post.title = params.title;
      post.content = params.content;
      await post.save();
      ctx.body = post;
    } catch (e) {
      ctx.body = {code: Enums.ApiCodes.FAIL, message: e.message};
    }
  }

  /**
   * 发布
   * @returns {Promise<void>}
   */
  async publish() {
    const {ctx} = this;
    const id = ctx.params.id;
    const params = ctx.request.body;
    try {
      const post = await ctx.model.Post.findOne({
        _id: id,
        _creatorId: ctx.user._id
      });
      if (!post) throw new Error('未找到文章');

      post.published = true;
      post.updateAt = Date.now();
      //Xss post.content = ctx.helper.escape(params.content);
      post.title = (params.title);
      post.desc = (params.desc);
      post.content = (params.content);
      //然后解析
      post.pics = [];
      const pics = [];
      const matchTags = post.content.match(/\!\[.+\]\(.+\)/g);
      if (null !== matchTags) {
        matchTags.forEach((p) => {
          p = p.replace(/\!\[.+\]/g, '').replace(/\(|\)/g, '');
          pics.push(p);
        });
      }
      post.pics = pics;
      post.tags = params.tags;
      post._categoryId = params._categoryId;
      await post.save();
      ctx.body = post;
    } catch (e) {
      ctx.body = {code: Enums.ApiCodes.FAIL, message: e.message};
    }
  }
}

module.exports = PostsController;
