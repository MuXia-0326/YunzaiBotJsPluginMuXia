/*
 * @Author: MuXia
 * @Date: 2022/10/08
 */
import fetch from 'node-fetch';
import common from '../../lib/common/common.js';
import plugin from '../../lib/plugins/plugin.js';

export class hotSearch extends plugin {
  constructor() {
    super({
      name: '热搜榜',
      dsc: '微博热搜和知乎热搜',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message.group',
      priority: 1500,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '^#?微博热搜$',
          /** 执行方法 */
          fnc: 'weibo',
        },
        {
          /** 命令正则匹配 */
          reg: '^#?知乎热搜$',
          /** 执行方法 */
          fnc: 'zhihu',
        },
      ],
    });
  }

  async weibo(e) {
    console.log('用户命令：', e.msg);

    //执行的逻辑功能
    let url = `http://api.weibo.cn/2/guest/search/hot/word`;
    let res = await fetch(url).catch((err) => logger.error(err));

    if (res.status != 200) {
      logger.error('[热搜榜] 微博热搜获取失败');
      await e.reply('[热搜榜] 微博热搜获取失败');
      return true;
    }
    res = await res.json();
    let data = res.data;

    let text = ['微博热搜榜'];
    let addText = '';
    for (let i = 1; i < data.length; i++) {
      addText = addText + i + '、' + data[i - 1].word;

      if (i % 5 == 0) {
        addText = addText.replace(/#/g, '');
        text.push(addText);
        addText = '';
      } else {
        addText = addText + '\n\n';
      }
    }

    e.reply(await common.makeForwardMsg(this.e, text, text[0]));

    //返回true 阻挡消息不再往下
    return true;
  }

  async zhihu(e) {
    console.log('用户命令：', e.msg);

    //执行的逻辑功能
    let url = `https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true`;
    let res = await fetch(url).catch((err) => logger.error(err));

    if (res.status != 200) {
      logger.error('[热搜榜] 知乎热搜获取失败');
      await e.reply('[热搜榜] 知乎热搜获取失败');
      return true;
    }
    res = await res.json();
    let data = res.data;

    let text = ['知乎热搜榜：'];
    let addText = '';
    for (let i = 1; i < data.length; i++) {
      addText = addText + i + '、' + data[i - 1].target.title;

      if (i % 5 == 0) {
        text.push(addText);
        addText = '';
      } else {
        addText = addText + '\n\n';
      }
    }

    e.reply(await common.makeForwardMsg(this.e, text, text[0]));

    //返回true 阻挡消息不再往下
    return true;
  }
}
