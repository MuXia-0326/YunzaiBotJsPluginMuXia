/*
 * @Author: MuXia
 * @Date: 2022/09/16
 */
import schedule from 'node-schedule';
import { Group, segment } from 'oicq';
import common from '../../lib/common/common.js';
import plugin from '../../lib/plugins/plugin.js';

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
const pushTime = '0 30 8 * * ?';

/**
 * 开启定时推送的群号，填写格式如下
 * 单个群号填写如下：
 * ["374900636"];
 * 多个个群号填写如下：
 * ["374900636","374900636"];
 */
const groupNumberList = [];

//开启定时任务（需要关闭，注释此行即可
dayPushTask();

export class day60sNews extends plugin {
  constructor() {
    super({
      name: '60s读懂世界',
      dsc: '获取60s读懂世界的日报',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message.group',
      priority: 1000,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '^#?60s日报$',
          /** 执行方法 */
          fnc: 'get60sDayNews',
        },
      ],
    });
  }

  async get60sDayNews(e) {
    send60sDayNews(e);
  }
}

/** 定时推送 */
function dayPushTask() {
  schedule.scheduleJob(pushTime, () => {
    for (var i = 0; i < groupNumberList.length; i++) {
      let group = Bot.pickGroup(groupNumberList[i]);
      send60sDayNews(group);
      common.sleep(3000);
    }
  });
}

/** 发送60s日报 */
async function send60sDayNews(e) {
  /** 60s日报url */
  // let url = `http://bjb.yunwj.top/php/tp/lj.php`;
  // let res = await fetch(url).catch((err) => logger.error(err));

  // if (res.status != 200) {
  //     logger.error("[60s读懂世界] 日报获取失败");
  //     if (e instanceof Group) {
  //         await e.sendMsg("[60s读懂世界] 日报获取失败");
  //     } else {
  //         await e.reply("[60s读懂世界] 日报获取失败");
  //     }
  //     return;
  // }
  // res = await res.json();

  let url = `https://api.03c3.cn/api/zb`;

  let msg = [segment.image(url, false, 120)];

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
