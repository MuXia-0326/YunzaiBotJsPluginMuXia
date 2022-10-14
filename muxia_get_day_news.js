/*
 * @Author: MuXia
 * @Date: 2022/09/16
 */
import { createRequire } from "module";
import fetch from "node-fetch";
import schedule from "node-schedule";
import { Group, segment } from "oicq";
import common from "../../lib/common/common.js";
import plugin from "../../lib/plugins/plugin.js";
const require = createRequire(import.meta.url);

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
const pushTime = "0 30 9 * * ?";

/**
 * 开启定时推送的群号，填写格式如下
 * ["374900636"];
 */
const groupNumberList = [];

//开启定时任务（需要关闭，注释此行即可
dayPushTask();

/**
 * 访问https://mp.weixin.qq.com/并登录，
 * 从network的https://mp.weixin.qq.com/cgi-bin/home请求中获取cookie复制粘贴到下面
 */
const cookie = "";

export class dayNews extends plugin {
    constructor() {
        super({
            name: "今日日报",
            dsc: "获取易即今日的日报",
            /** https://oicqjs.github.io/oicq/#events */
            event: "message.group",
            priority: 1000,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: "^#?今日日报$",
                    /** 执行方法 */
                    fnc: "getDayNews"
                }
            ]
        });
    }

    async getDayNews(e) {
        sendDayNews(e);
    }
}

/** 定时推送 */
function dayPushTask() {
    schedule.scheduleJob(pushTime, () => {
        for (var i = 0; i < groupNumberList.length; i++) {
            let group = Bot.pickGroup(groupNumberList[i]);
            sendDayNews(group);
            common.sleep(3000);
        }
    });
}

/** 发送日报 */
async function sendDayNews(e) {
    let param = {
        headers: {
            method: "get",
            referer: "https://mp.weixin.qq.com/",
            Host: "mp.weixin.qq.com",
            "user-agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
            Cookie: ""
        }
    };

    param.headers.Cookie = cookie;

    let token;

    /** 使用cookie登录获取token */
    let loginUrl = `https://mp.weixin.qq.com`;
    let loginRes = await fetch(loginUrl, param).catch((err) => logger.error(err));

    if (loginRes.status == 200 && loginRes.url.indexOf("?") == -1) {
        logger.error("[今日日报] 登录接口请求失败");
        await e.reply("[今日日报] 获取登录token失败，可能cookie失效，请重新配置cookie");
        return true;
    }

    let params = loginRes.url.split("?")[1].split("&");
    for (var item in params) {
        if (params[item].indexOf("token") == 0) {
            token = params[item].split("=")[1];
        }
    }

    if (!token) {
        logger.error("[今日日报] 用户cookie失效");
        await e.reply("[今日日报] cookie失效，请重新配置cookie");
        return true;
    }

    /** 用接口获取自定义公众号的fakeid */
    // // 公众号名字
    // let queryName = "易即今日";

    // let queryFakeIdUrl = `https://mp.weixin.qq.com/cgi-bin/searchbiz?action=search_biz&begin=0&count=5&lang=zh_CN&f=json&ajax=1&query=${queryName}&token=${token}`;
    // let fakeidRes = await fetch(queryFakeIdUrl, param).catch((err) => logger.error(err));
    // if (fakeidRes.status != 200) {
    //     logger.error("[今日日报] 公众号查询接口失败");
    //     await e.reply("[今日日报] 公众号查询接口失败");
    //     return true;
    // }

    // fakeidRes = await fakeidRes.json();
    // let fakeid = fakeidRes.list[0].fakeid;

    // if (!fakeid) {
    //     logger.error("[获取每日日报] 获取公众号id失败");
    //     await e.reply("获取公众号id失败");
    //     return true;
    // }

    /** 直接写死公众号fakeid */
    //易即今日公众号fakeid
    let fakeid = "MjM5MTA3NTQwNQ==";

    /** 获取公众号推文 */
    let imgUrl = `https://mp.weixin.qq.com/cgi-bin/appmsg?action=list_ex&begin=0&count=5&type=9&lang=zh_CN&f=json&ajax=1&fakeid=${fakeid}&token=${token}`;

    let getImgRes = await fetch(imgUrl, param).catch((err) => logger.error(err));

    /** 判断接口是否请求成功 */
    if (getImgRes.status != 200) {
        logger.error("[今日日报] 获取日报消息失败");
        await e.reply("[今日日报] 获取日报消息失败");
        return true;
    }

    //获取推文url
    let link = "";

    getImgRes = await getImgRes.json();
    let msgList = getImgRes.app_msg_list;

    let date = new Date();
    const dayTitle = `今日简报（${date.getMonth() + 1}月${date.getDate()}日）`;

    for (const item in msgList) {
        if (msgList[item].title == dayTitle) {
            link = msgList[item].link;
        }
    }

    if (link == "") {
        logger.error("[今日日报] 获取日报url失败");
        await e.reply("[今日日报] 获取日报url失败");
        return true;
    }

    //截取页面内容发送消息（这部分借鉴的别人的代码，不是太懂原理）
    const puppeteer = require("puppeteer");
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--disable-gpu",
            "--disable-dev-shm-usage",
            "--disable-setuid-sandbox",
            "--no-first-run",
            "--no-sandbox",
            "--no-zygote",
            "--single-process"
        ]
    });
    const page = await browser.newPage();
    await page.goto(link);
    await page.setViewport({
        width: 1080,
        height: 1920
    });

    let msg = [
        segment.image(
            await page.screenshot({
                fullPage: true
            })
        )
    ];

    if (e instanceof Group) {
        e.sendMsg(msg);
    } else {
        //添加@成员
        msg.unshift(segment.at(e.user_id));
        e.reply(msg);
    }

    await browser.close();

    //返回true 阻挡消息不再往下
    return true;
}
