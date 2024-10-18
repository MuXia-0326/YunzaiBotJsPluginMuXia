/*
 * @Author: MuXia
 * @Date: 2022/10/12
 */
import fetch from 'node-fetch';
import { segment } from 'oicq';
import plugin from '../../lib/plugins/plugin.js';

/**
 * 此插件根据 https://github.com/SmallK111407/earth-k-plugin 的 dawo.js 源码进行更改优化
 */

let botOut;
let botOutText;
let userOut;

let startFlag = 0;
let duelUser;

const url_1 = 'https://iw233.cn/API/Random.php';
const url_2 = 'http://ovooa.com/API/meizi/api.php?type=image';

//给我色图专用url
const seseUrl = `https://api.lolicon.app/setu/v2?proxy=i.pixiv.re&r18=0&size=original`;

//默认使用二次元url
let urlIndex = url_1;

//redis相关变量
const redisTime = 60 * 15;
const redisKeyPrefix = 'muxia:plugin:guessingGame:';

export class guessingGame extends plugin {
  constructor() {
    super({
      name: '猜拳游戏',
      dsc: '猜拳游戏，赢了有色图,输了禁言',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message',
      /** 优先级，数字越小等级越高 */
      priority: 1200,
      rule: [
        {
          reg: '^#?开始决斗$',
          fnc: 'mora',
        },
        {
          reg: '^石头|剪刀|布$',
          fnc: 'doMora',
        },
        {
          reg: '^#?给我色图$',
          fnc: 'force',
        },
        {
          reg: '^#猜拳游戏切换图源$',
          fnc: 'updateImgUrl',
        },
      ],
    });
  }

  async mora(e) {
    if (startFlag == 1) {
      await this.reply('\n小派蒙没办法同时跟多个人决斗', false, { at: true });
      return;
    } else {
      startFlag = 1;
      duelUser = e.user_id;
    }

    botOut = Math.floor(Math.random() * 3);
    if (botOut == 0) {
      botOutText = '我出石头';
    } else if (botOut == 1) {
      botOutText = '我出剪刀';
    } else if (botOut == 2) {
      botOutText = '我出布';
    }

    /** 回复 */
    await e.reply('\n给你20秒，跟我来把猜拳，赢了奖励，输了禁言！你先发,石头，剪刀，布，出吧', false, { at: true });

    setTimeout(function () {
      if (startFlag == 1) {
        e.reply('\n20秒已过，还不出，给我寄！', false, { at: true });
        e.group.muteMember(duelUser, 10);
        startFlag = 0;
        duelUser = '';
      }
    }, 20 * 1000);
  }

  async doMora(e) {
    if (duelUser != e.user_id) {
      return;
    }

    if (e.msg == '石头') {
      userOut = 0;
    } else if (e.msg == '剪刀') {
      userOut = 1;
    } else if (e.msg == '布') {
      userOut = 2;
    } else {
      e.reply(`能不能好好玩游戏！请重新开始决斗`);
      return;
    }
    sendResult(e);
  }

  async force(e) {
    let delMsg = false;
    let mute = false;
    if (this.e.group.is_admin && this.e.sender.role != 'owner') {
      delMsg = true;
    }
    let redisKey = redisKeyPrefix + e.group_id + e.sender.user_id;

    let redisMsg = JSON.parse(await redis.get(redisKey));
    if (redisMsg) {
      redis.setEx(redisKey, redisTime, JSON.stringify({ count: redisMsg.count + 1 }));
    } else {
      redis.setEx(redisKey, redisTime, JSON.stringify({ count: 1 }));
    }

    redisMsg = JSON.parse(await redis.get(redisKey));

    console.log(redisMsg);

    let msgList = [];
    if (redisMsg.count == 1) {
      msgList.push(`\n跟我进行决斗，赢了才能获取色图`);
    } else if (redisMsg.count == 2) {
      msgList.push(`\n我看你是在为难我小派蒙，快去发起决斗`);
    } else if (redisMsg.count == 3) {
      mute = true;
      if (!delMsg && mute) {
        msgList.push([segment.at(e.user_id), `\n你为什么就这样执迷不悟呢，看来只能给你点教训了`]);
        msgList.push(`可恶小派蒙为什么没有禁言权限啊！！`);
      } else {
        msgList.push(`\n你为什么就这样执迷不悟呢，看来只能给你点教训了`);
        e.group.muteMember(e.user_id, 60);
      }
    } else if (redisMsg.count == 4) {
      msgList.push([segment.at(e.user_id), `\n哎鸭，你怎么还死缠烂打啊，算了，看在你这么乞求的份上就给你看一眼`]);

      let res = await (await fetch(seseUrl)).json();
      msgList.push(segment.flash(res.data[0].urls.original));

      redis.del(redisKey);
    } else if (redisMsg.count > 4) {
      redis.del(redisKey);
      return;
    }

    if (msgList.length > 1) {
      for (let i in msgList) {
        e.reply(msgList[i]);
      }
    } else {
      e.reply(msgList, false, { at: true });
    }
  }

  async updateImgUrl(e) {
    let urlText;
    if (urlIndex == url_1) {
      urlText = '真人';
      urlIndex = url_2;
    } else if (urlIndex == url_2) {
      urlText = '二次元';
      urlIndex = url_1;
    }
    e.reply(`切换为${urlText}图源`);
  }
}

async function sendResult(e) {
  if (botOut == userOut) {
    e.reply(`${botOutText}，平局，饶你一回`);
  }
  if ((botOut == 1 && userOut == 0) || (botOut == 2 && userOut == 1) || (botOut == 0 && userOut == 2)) {
    let imgs = await fetch(urlIndex).catch((err) => logger.error(err));
    let msg = [`${botOutText}，我输了，给你张涩图吧。快谢谢我！`, segment.image(imgs.url)];
    e.reply(msg);
  }
  if ((botOut == 2 && userOut == 0) || (botOut == 0 && userOut == 1) || (botOut == 1 && userOut == 2)) {
    e.reply(`${botOutText}，你输了，给我寄！`);
    e.group.muteMember(e.user_id, 30);
  }

  startFlag = 0;
  duelUser = '';
  return;
}
