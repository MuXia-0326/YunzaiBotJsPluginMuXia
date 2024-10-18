/*
 * @Author: MuXia
 * @Date: 2022/10/11
 */
import fetch from 'node-fetch';
import { segment } from 'oicq';
import plugin from '../../lib/plugins/plugin.js';

/**
 * 此插件根据 https://gitee.com/koinori/Icepray-plugin 的 cat.js 源码进行更改优化
 */

export class animal extends plugin {
  constructor() {
    super({
      name: '云吸猫',
      dsc: '随机猫猫',
      event: 'message',
      priority: 50,
      rule: [
        {
          reg: '^#*吸猫$',
          fnc: 'cat',
        },
        {
          reg: '^#*柴犬$',
          fnc: 'shibe',
        },
        {
          reg: '^#*来只鸟$',
          fnc: 'bird',
        },
      ],
    });
  }

  async cat(e) {
    let res = await (await fetch('https://shibe.online/api/cats')).json();
    let url = res.toString();
    e.reply(segment.image(url));

    let msg = ['猫图加载中...'];
    this.e.reply(msg);
    return true;
  }

  async shibe(e) {
    let res = await (await fetch('http://shibe.online/api/shibes')).json();
    let url = res.toString();
    e.reply(segment.image(url));

    let msg = ['柴犬加载中...'];
    this.e.reply(msg);
    return true;
  }

  async bird(e) {
    let res = await (await fetch('https://shibe.online/api/birds')).json();
    let url = res.toString();
    e.reply(segment.image(url));

    let msg = ['鸟图加载中...'];
    this.e.reply(msg);
    return true;
  }
}
