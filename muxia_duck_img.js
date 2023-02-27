/*
 * @Author: MuXia
 * @Date: 2022/10/11
 */
import fetch from "node-fetch";
import schedule from "node-schedule";
import { Group, segment } from "oicq";
import common from "../../lib/common/common.js";
import plugin from "../../lib/plugins/plugin.js";

/* 各位代表的意思 *-代表任意值 ？-不指定值，仅日期和星期域支持该字符。 （想了解更多，请自行搜索Cron表达式学习）
    *  *  *  *  *  *
    ┬  ┬  ┬  ┬  ┬  ┬
    │  │  │  │  │  |
    │  │  │  │  │  └ 星期几，取值：0 - 7，其中 0 和 7 都表示是周日
    │  │  │  │  └─── 月份，取值：1 - 12
    │  │  │  └────── 日期，取值：1 - 31
    │  │  └───────── 时，取值：0 - 23
    │  └──────────── 分，取值：0 - 59
    └─────────────── 秒，取值：0 - 59（可选）
*/
const pushTime = "0 0 8,12,19,21 * * ?";

/**
 * 开启定时推送的群号，填写格式如下
 * 单个群号填写如下：
 * ["374900636"];
 * 多个个群号填写如下：
 * ["374900636","374900636"];
 */
const groupNumberList = [];

//开启定时任务（需要关闭，注释此行即可
dayPushDuckImg();

//鸭鸭图url
const duckUrl = "https://random-d.uk/api/v2/random";
//猫猫图url
const catUrl = "https://shibe.online/api/cats";
//柴犬图url
const shibesUrl = "http://shibe.online/api/shibes";
//小鸟图url
const birdUrl = "https://shibe.online/api/birds";

export class duckImg extends plugin {
    constructor() {
        super({
            name: "鸭鸭照",
            dsc: "随机鸭图",
            /** https://oicqjs.github.io/oicq/#events */
            event: "message.group",
            priority: 1000,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: "^#?(哎鸭|哎呀|aiya)$",
                    /** 执行方法 */
                    fnc: "duckImg"
                }
            ]
        });
    }

    async duckImg(e) {
        getDuckImg(e);

        //返回true 阻挡消息不再往下
        return true;
    }
}

/** 定时推送 */
function dayPushDuckImg() {
    schedule.scheduleJob(pushTime, () => {
        for (var i = 0; i < groupNumberList.length; i++) {
            let group = Bot.pickGroup(groupNumberList[i]);

            let hour = new Date().getHours();
            let sendText = "";
            if (hour == 8) {
                sendText = "早上好！快谢谢鸭鸭。";
                getDuckImg(group, sendText);
            } else if (hour == 12) {
                sendText = "中午好！快谢谢猫猫。";
                getUrlImg(group, catUrl, sendText);
            } else if (hour == 19) {
                sendText = "晚上好！快谢谢柴犬。";
                getUrlImg(group, shibesUrl, sendText);
            } else if (hour == 21) {
                sendText = "晚安好梦！快谢谢小鸟。";
                getUrlImg(group, birdUrl, sendText);
            }

            common.sleep(3000);
        }
    });
}

async function getDuckImg(e, sendText) {
    /** 鸭鸭图url */
    let res = await fetch(duckUrl).catch((err) => logger.error(err));

    if (res.status != 200) {
        logger.error("[鸭鸭照] 鸭图获取失败");
        await e.reply("[鸭鸭照] 鸭图获取失败");
        return;
    }
    res = await res.json();

    let msg = [segment.image(res.url), res.message];

    if (e instanceof Group) {
        msg.unshift(sendText);
        e.sendMsg(msg);
    } else {
        //添加@成员
        msg.unshift(segment.at(e.user_id));
        e.reply(msg);
    }
}

async function getUrlImg(e, url, sendText) {
    let res = await (await fetch(url)).json();
    let imgUrl = res.toString();

    let msg = [segment.image(imgUrl)];

    if (e instanceof Group) {
        msg.unshift(sendText);
        e.sendMsg(msg);
    }
}
