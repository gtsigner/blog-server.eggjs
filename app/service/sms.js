const Service = require('egg').Service;
const SMSClient = require('@alicloud/sms-sdk');

const accessKeyId = 'LTAIayLRis1k7B4c';
const secretAccessKey = 'qfUPLzxHFCYkZqwDg6HZ4QB91L9rpw';
let smsClient = new SMSClient({accessKeyId, secretAccessKey});

module.exports = class SmsService extends Service {

    /**
     * 发送随机验证码
     * @param phone
     * @param type
     * @returns {Promise<*>}
     */
    async sendSmsCode(phone, type) {
        const {ctx} = this;
        // try {
        //     ctx.validate({phone: 'china-phone'}, {phone: phone});
        // } catch (ex) {
        //     throw new Error('请填写正确的手机号码');
        // }
        //TODO 验证手机号和IP当日发送的次数,然后做发送限制
        let code = ctx.helper.randomSMSCode(4);
        let tpl = {
            PhoneNumbers: phone,
            SignName: '易游互娱',
            TemplateCode: 'SMS_5027058',
            TemplateParam: `{"code":"${code}","product":"安全"}`
        };
        //存放Session
        ctx.session['PHONE_SMS_CODE'] = {
            phone: phone,
            type: type,
            code: code,
            time: new Date().getTime()
        };
        //  return await smsClient.sendSMS(tpl);
        return code;
    }

    async verifySmsCode(phone, inputCode, type) {
        const {ctx} = this;
        let sms = ctx.session['PHONE_SMS_CODE'];
        if (!sms) {
            return false;
        }
        return sms.phone === phone && sms.code === inputCode;
    }
};
