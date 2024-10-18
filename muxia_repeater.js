/*
 * @Author: MuXia
 * @Date: 2022/09/16
 */
import { segment } from 'oicq';
import plugin from '../../lib/plugins/plugin.js';

//复读阈值
const repeaterThreshold = 3;
//缓存存储时间 s为单位
const redisTime = 60 * 15;

const redisKeyPrefix = 'muxia:plugin:autoRepeater:';

export class autoRepeater extends plugin {
  constructor() {
    super({
      name: '自动复读',
      dsc: '检测群聊内容，当出现多次内容后，自动进行复读',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message.group',
      priority: 60000,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '^[\\s\\S]*$',
          /** 执行方法 */
          fnc: 'autoRepeater',
        },
      ],
    });
  }

  async autoRepeater(e) {
    if (e.message.length > 1) {
      return;
    }

    let msg = e.message[0];

    if (msg.type == 'image') {
      let redisKey = redisKeyPrefix + e.group_id + msg.file;

      let redisMsg = JSON.parse(await redis.get(redisKey));
      if (redisMsg) {
        redis.setEx(redisKey, redisTime, JSON.stringify({ count: redisMsg.count + 1, imgUrl: msg.url }));
      } else {
        redis.setEx(redisKey, redisTime, JSON.stringify({ count: 1, imgUrl: msg.url }));
      }

      redisMsg = JSON.parse(await redis.get(redisKey));
      if (redisMsg.count >= repeaterThreshold) {
        e.reply(segment.image(redisMsg.imgUrl));
        redis.del(redisKey);
      }
    } else if (msg.type == 'text') {
      let redisKey = redisKeyPrefix + e.group_id + msg.text;

      let redisMsg = JSON.parse(await redis.get(redisKey));
      if (redisMsg) {
        redis.setEx(redisKey, redisTime, JSON.stringify({ count: redisMsg.count + 1, sendText: msg.text }));
      } else {
        redis.setEx(redisKey, redisTime, JSON.stringify({ count: 1, sendText: msg.text }));
      }

      redisMsg = JSON.parse(await redis.get(redisKey));
      if (redisMsg.count >= repeaterThreshold) {
        e.reply(redisMsg.sendText);
        redis.del(redisKey);
      }
    }

    return false;
  }
}
