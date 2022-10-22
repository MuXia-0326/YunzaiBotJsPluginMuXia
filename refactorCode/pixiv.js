import fetch from "node-fetch";
import { segment } from "oicq";
import common from "../../lib/common/common.js";
import plugin from "../../lib/plugins/plugin.js";

/**
 * 此插件根据 https://github.com/SmallK111407/earth-k-plugin 的 sese.js 源码进行更改优化
 */

//图文模式切换 变量
let isSendImgFlag = 0;

//群聊18开关
let r18 = 0;
//私聊18开关
let r18Master = 0;
//单次发送的图片数
let sl = 3;
//撤回时间s为单位
let delMsg = 90;

let url = "";
let msgRes = [];
let delMsgIdList = [];

export class pixiv extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: "色色",
            /** 功能描述 */
            dsc: "隐藏色色",
            /** https://oicqjs.github.io/oicq/#events */
            event: "message",
            /** 优先级，数字越小等级越高 */
            priority: 1200,
            rule: [
                {
                    reg: "^#?来点色图.*$",
                    fnc: "getHImg"
                },
                {
                    reg: "^#设置图片数量(.*)|#开启18(.*)$|#关闭18(.*)$",
                    fnc: "settings"
                }
            ]
        });
    }

    /** 来点色图 */
    async getHImg(e) {
        if (e.isGroup && e.group.is_admin && e.sender.role != "owner") {
            delMsgIdList.push(e.message_id);
        }
        /** 设置上下文，后续接收到内容会执行getKeyword方法 */
        this.setContext("getKeyword");
        /** 回复 */
        await this.reply("\n请回复 随机 或 关键词 ，关键词有多个，请使用 | 分割\n例如：少女|可爱", false, {
            at: true,
            recallMsg: delMsg
        });
    }

    /** 来点色图后续 */
    getKeyword() {
        this.e.reply("小派蒙正在为您寻找，你想要的图片，请稍等！", false, { recallMsg: delMsg });
        if (this.e.isGroup) {
            if (this.e.group.is_admin && this.e.sender.role != "owner") {
                delMsgIdList.push(this.e.message_id);
            }
            sendPixivImg(this.e);
        } else if (this.e.isMaster & this.e.isPrivate) {
            sendPixivImg(this.e);
        } else if (this.e.isPrivate) {
            this.e.reply("不可以私聊涩涩哦");
        }
        /** 结束上下文 */
        this.finish("getKeyword");
    }

    async settings(e) {
        if (e.isMaster) {
            if (e.msg.includes("#设置图片数量")) {
                let keyword = e.msg.replace("#设置图片数量", "");
                sl = Number(keyword);
                e.reply("当前返回" + keyword + "张图");
            }

            if (e.msg.includes("#开启18")) {
                let keyword = e.msg.replace("#开启18", "");
                if (keyword.length == 0) {
                    e.reply(`请在后面跟进群聊，还是私聊\n我看你是在为难我小派蒙`);
                    return;
                }

                e.reply(`${keyword}已开启R18模式，请注意身体`);
                if (keyword == "群聊") {
                    r18 = 1;
                } else if (keyword == "私聊") {
                    r18Master = 1;
                }
            }
            if (e.msg.includes("#关闭18")) {
                let keyword = e.msg.replace("#关闭18", "");
                if (keyword.length == 0) {
                    e.reply(`请在后面跟进群聊，还是私聊\n我看你是在为难我小派蒙`);
                    return;
                }

                e.reply(`${keyword}已关闭R18模式，进入养生模式`);
                if (keyword == "群聊") {
                    r18 = 0;
                } else if (keyword == "私聊") {
                    r18Master = 0;
                }
            }
        } else {
            e.reply("主人才可以进行设置");
        }
    }
}

async function sendPixivImg(e) {
    msgRes = [];
    let keyword;

    if (e.msg == "随机") {
        keyword = "";
    } else {
        keyword = e.msg;
    }

    if (e.isGroup) {
        url = `https://api.lolicon.app/setu/v2?tag=${keyword}&proxy=i.pixiv.re&r18=${r18}&size=original`;
    } else {
        url = `https://api.lolicon.app/setu/v2?tag=${keyword}&proxy=i.pixiv.re&r18=${r18Master}&size=original`;
    }

    let response = ""; //调用接口获取数据
    let res = ""; //结果json字符串转对象

    try {
        for (let i = 0; i < sl; i++) {
            response = await fetch(url);
            res = await response.json();
            if (isSendImgFlag == 0) {
                let sendText = `标题：${res.data[0].title}\n作者：${res.data[0].author}\n作品id：${res.data[0].pid}\n原网站：https://www.pixiv.net/artworks/${res.data[0].pid}\n可访问网站：${res.data[0].urls.original}`;
                msgRes[i] = [sendText];
            } else {
                msgRes[i] = [segment.image(res.data[0].urls.original)];
            }
        }
    } catch {
        e.reply("对不起，没有搜索到" + keyword);
        return;
    }

    if (res.data.length == 0) {
        e.reply("暂时没有搜到哦！换个关键词试试吧！");
        return;
    }

    console.log("请求url：", msgRes);

    if (e.isGroup) {
        let msg = await e.reply(await common.makeForwardMsg(e, msgRes, ""), false, { recallMsg: delMsg });
        if (msg == undefined) {
            e.reply("请求色图失败,请稍后重试", false, { recallMsg: delMsg });
        }
        if (delMsgIdList.length > 0) {
            setTimeout(() => {
                for (let index in delMsgIdList) {
                    e.group.recallMsg(delMsgIdList[index]);
                }
            }, delMsg);
        }
    } else {
        for (let i in msgRes) {
            e.reply(msgRes[i], false, { recallMsg: delMsg });
        }
    }
}
