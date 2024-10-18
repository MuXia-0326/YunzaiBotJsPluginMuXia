/*
 * @Author: MuXia
 * @Date: 2022/10/11
 */
import fetch from 'node-fetch';
import schedule from 'node-schedule';
import { Group, segment } from 'oicq';
import common from '../../lib/common/common.js';
import plugin from '../../lib/plugins/plugin.js';

/**
 * 定制群号 必须在这配置
 *
 * 开启定时推送的群号，填写格式如下
 * 单个群号填写如下：
 * ["374900636"];
 * 多个个群号填写如下：
 * ["374900636","374900636"];
 */
const groupNumberList = [];

/**
 * 配置文件
 * time 发送时间 单位小时 当前不支持单个的分钟修改
 * sendText 发送文本内容
 * imgType 发送图片类型 1-鸭鸭 2-猫猫 3-柴犬 4-鸟 不同时间段的图片可重复，按自己的喜好更改
 *
 * all 代表所有群的默认配置，如需定制单个群的发送时间、文本内容和配图
 * 请复制整个all，然后将all改为定制群号配置文件下方有个示例，按示例的样子配置即可
 * 定制群号 必须在上面配置
 *
 * 发送次数可以自定义，有几组数据就会发几次，只要你想，你可以每小时都发一次
 */
const config = {
  all: [
    {
      time: 8,
      sendText: '早上好！快谢谢鸭鸭。',
      imgType: 1,
    },
    {
      time: 12,
      sendText: '中午好！快谢谢猫猫。',
      imgType: 2,
    },
    {
      time: 19,
      sendText: '晚上好！快谢谢柴犬。',
      imgType: 3,
    },
    {
      time: 21,
      sendText: '晚安好梦！快谢谢小鸟。',
      imgType: 4,
    },
  ],
};
//开启定时任务（需要关闭，注释此行即可
openPush();

//鸭鸭图url
const duckUrl = 'https://random-d.uk/api/v2/random';
//猫猫图url
const catUrl = 'https://shibe.online/api/cats';
//柴犬图url
const shibesUrl = 'http://shibe.online/api/shibes';
//小鸟图url
const birdUrl = 'https://shibe.online/api/birds';

export class duckImg extends plugin {
  constructor() {
    super({
      name: '鸭鸭照',
      dsc: '随机鸭图',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message.group',
      priority: 1000,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '^#?(哎鸭|哎呀|aiya)$',
          /** 执行方法 */
          fnc: 'duckImg',
        },
      ],
    });
  }

  async duckImg(e) {
    getDuckImg(e);

    //返回true 阻挡消息不再往下
    return true;
  }
}

function openPush() {
  // 创建存储对象
  let pushEntityList = [];

  // 获取所有key，将需要推送群进行分组
  let group = new Array();
  for (let key in config) {
    group.push(key);
  }

  // 根据配置情况，组装对象
  if (group.length > 1) {
    let pushNumberList = groupNumberList.slice(0);
    for (let i in group) {
      if (group[i] != 'all') {
        let flag = pushNumberList.indexOf(group[i]);
        if (flag > -1) {
          pushNumberList.splice(flag, 1);
        }

        pushEntityList.push(
          {
            name: 'all',
            list: pushNumberList,
          },
          {
            name: group[i],
            list: [group[i]],
          },
        );
      }
    }
  } else {
    pushEntityList.push({
      name: group[0],
      list: groupNumberList,
    });
  }

  // 组装cron表达式
  for (let i in pushEntityList) {
    let sendConfig = config[pushEntityList[i].name];

    let time = new Array(4);
    for (let key in sendConfig) {
      time[key] = sendConfig[key].time;
    }

    let pushTime = `0 0 ${time.join(',')} * * ?`;
    pushEntityList[i].pushTime = pushTime;
    pushEntityList[i].sendConfig = sendConfig;
  }

  // 开启定时任务
  addPushTask(pushEntityList);
}

/** 定时推送 */
function addPushTask(pushEntityList) {
  for (let index in pushEntityList) {
    let push = pushEntityList[index];

    schedule.scheduleJob(push.pushTime, () => {
      for (var i = 0; i < push.list.length; i++) {
        let group = Bot.pickGroup(push.list[i]);

        let hour = new Date().getHours();

        for (let q in push.sendConfig) {
          if (hour == push.sendConfig[q].time) {
            pushImgByType(group, push.sendConfig[q].sendText, push.sendConfig[q].imgType);
          }
        }

        common.sleep(3000);
      }
    });
  }
}

async function pushImgByType(e, sendText, typeId) {
  if (typeId == 1) {
    getDuckImg(e, sendText);
  } else if (typeId == 2) {
    getUrlImg(e, catUrl, sendText);
  } else if (typeId == 3) {
    getUrlImg(e, shibesUrl, sendText);
  } else if (typeId == 4) {
    getUrlImg(e, birdUrl, sendText);
  }
}

async function getDuckImg(e, sendText) {
  /** 鸭鸭图url */
  let res = await fetch(duckUrl).catch((err) => logger.error(err));

  if (res.status != 200) {
    logger.error('[鸭鸭照] 鸭图获取失败');
    if (e instanceof Group) {
      await e.sendMsg('[鸭鸭照] 鸭图获取失败');
    } else {
      await e.reply('[鸭鸭照] 鸭图获取失败');
    }
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
