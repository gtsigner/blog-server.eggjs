'use strict';

const Controller = require('egg').Controller;

const path = require('path');
const uuidv4 = require('uuid/v4');
const Enums = require('../../extend/enums');

class UploadController extends Controller {
  async image() {
    const {ctx} = this;
    const stream = await ctx.getFileStream();
    let name = 'blog-oeynet-com/' + ctx.md5(uuidv4() + '-' + path.basename(stream.filename));
    let result;
    try {
      //进行图片处理
      result = await ctx.oss.put(name, stream);
      result.url = result.url.replace(/\-internal/g, '').replace(/http:\/\//g, 'https://');
    } catch (err) {
      throw err;
    }
    ctx.body = {
      url: result.url + '?x-oss-process=style/product-oey-canvas',
    }
  }

  /**
   * 上传编辑图
   * @returns {Promise<void>}
   */
  async editor() {
    const {ctx} = this;
    const stream = await ctx.getFileStream();
    let name = 'blog-oeynet-com/editor/' + ctx.md5(uuidv4() + '-' + path.basename(stream.filename));
    let result;
    try {
      result = await ctx.oss.put(name, stream);
      result.url = result.url.replace(/\-internal/g, '').replace(/http:\/\//g, 'https://');
      const file = {
        _creatorId: ctx.user._id,
        name: name,
        filename: stream.filename,
        mime: stream.mime,
        mimeType: stream.mimeType,
        ossResult: result,
        url: result.url,
        styleUrls: {
          min: 'product-oey-canvas',
        },
        status: 1
      };
      const fileIns = new ctx.model.Files(file);
      fileIns.save().then(() => {

      });
      //进行图片处理
      ctx.body = {
        code: Enums.ApiCodes.SUCCESS,
        data: {
          file: file,
          url: result.url + '?x-oss-process=style/product-oey-canvas'
        }
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UploadController;
