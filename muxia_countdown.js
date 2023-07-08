/*
 * @Author: MuXia
 * @Date: 2023/03/19
 */
import { Group, segment } from "icqq";
import fetch from "node-fetch";
import schedule from "node-schedule";
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
const pushTime = "0 30 7 * * ?";

/**
 * 开启定时推送的群号，填写格式如下
 * ["374900636"];
 * 多个个群号填写如下：
 * ["374900636","374900636"];
 */
const groupNumberList = [];

//开启定时任务（需要关闭，注释此行即可
dayPushCountdown();

//高考日期
const collegeEntranceTime = "06/07";

export class countdown extends plugin {
    constructor() {
        super({
            name: "倒计时",
            dsc: "可以自定义添加各种倒计时服务",
            /** https://oicqjs.github.io/oicq/#events */
            event: "message",
            priority: 1000,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: "^#?高考(倒计时)?$",
                    /** 执行方法 */
                    fnc: "collegeEntranceCountdown"
                }
            ]
        });
    }

    async collegeEntranceCountdown(e) {
        sendCollegeEntranceCountdown(e);
    }
}

/** 定时推送 */
function dayPushCountdown() {
    schedule.scheduleJob(pushTime, () => {
        for (var i = 0; i < groupNumberList.length; i++) {
            let group = Bot.pickGroup(groupNumberList[i]);
            sendCollegeEntranceCountdown(group);
            common.sleep(3000);
        }
    });
}

async function sendCollegeEntranceCountdown(e) {
    //获取项目运行路径
    const _path = process.cwd();

    let nowDate = getNowFormatDate();
    let endYear = (nowDate.month == 6 && nowDate.strDate > 8) || nowDate.month > 6 ? nowDate.year + 1 : nowDate.year;

    let nowStr = nowDate.year + "/" + nowDate.month + "/" + nowDate.strDate;
    let endStr = endYear + "/" + collegeEntranceTime;

    let days = getDaysBetween(nowStr, endStr);

    let text = "";

    if (nowDate.month < 6 || (nowDate.month == 6 && nowDate.strDate < 7)) {
        text += `距离${nowDate.year}年高考还有${days}天`;
    } else if (nowDate.month == 6 && (nowDate.strDate == 7 || nowDate.strDate == 8)) {
        text += nowDate.strDate == 7 ? `今天是${nowDate.year}年高考的第一天，` : `今天是${nowDate.year}年高考的第二天，`;
        text += `预祝本群各位考生，能在考场上超常发挥，考的全会，蒙的全对，考上自己心意的学校！`;
    } else if (nowDate.month < 8) {
        text += `${nowDate.year}年高考已经结束\n距离${endYear}年高考还有${days}天`;
    } else {
        text += `距离${endYear}年高考还有${days}天`;
    }

    if (nowDate.month != 6 && (nowDate.strDate != 7 || nowDate.strDate != 8)) {
        await getGoodSentence().then((res) => {
            text += "\n\n今日鸡汤：\n" + res;
        });
    }

    let msg = [
        //文本消息
        text,
        //图片
        segment.image(`file:///${_path}/resources/img/gaofenpenwu.png`)
    ];

    if (e instanceof Group) {
        e.sendMsg(msg);
    } else {
        //添加@成员
        msg.unshift(segment.at(e.user_id));
        e.reply(msg);
    }

    //返回true 阻挡消息不再往下
    return true;
}

//获取高考鸡汤
async function getGoodSentence() {
    let pn = Math.round(Math.random() * 5);
    let url = `https://hanyu.baidu.com/hanyu/api/sentencelistv2?query=高考鸡汤&src_id=51328&pn=${pn}&ps=20`;
    let res = await fetch(url).catch((err) => logger.error(err));

    if (res.status != 200) {
        logger.error("[高考倒计时] 鸡汤获取失败");
        return "[高考倒计时] 鸡汤获取失败";
    }
    res = await res.json();

    let number = parseInt(Math.random() * 20 - 1);

    let returnBody = "";

    if (res.data.ret_array.length == 0 || res.data.ret_array[0].list.length < number + 1) {
        returnBody = getGoodSentence();
        return returnBody;
    }

    return res.data.ret_array[0].list[number].body[0];
}

//获取当前日期函数
function getNowFormatDate() {
    let date = new Date(),
        year = date.getFullYear(), //获取完整的年份(4位)
        month = date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
        strDate = date.getDate(); // 获取当前日(1-31)
    if (month < 10) month = `0${month}`; // 如果月份是个位数，在前面补0
    if (strDate < 10) strDate = `0${strDate}`; // 如果日是个位数，在前面补0

    return { year: year, month: month, strDate: strDate };
}

/**
 * @param startDate  开始日期 yyyy-MM-dd
 * @param enDate  结束日期 yyyy-MM-dd
 * @returns {number} 两日期相差的天数
 */
function getDaysBetween(startDate, enDate) {
    const sDate = Date.parse(startDate);
    const eDate = Date.parse(enDate);
    if (sDate > eDate) {
        return 0;
    }
    // 这个判断可以根据需求来确定是否需要加上
    if (sDate === eDate) {
        return 1;
    }
    const days = (eDate - sDate) / (1 * 24 * 60 * 60 * 1000);
    return days;
}
