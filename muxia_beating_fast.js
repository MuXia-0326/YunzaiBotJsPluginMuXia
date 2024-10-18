/*
 * @Author: MuXia
 * @Date: 2022/09/21
 */
import { segment } from 'oicq';
import BotCfg from '../../lib/config/config.js';
import plugin from '../../lib/plugins/plugin.js';

export class beatingFast extends plugin {
  constructor() {
    super({
      name: '速速挨打',
      dsc: '速速挨打',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message.group',
      priority: 1500,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '^揍他$',
          /** 执行方法 */
          fnc: 'beatingFast',
        },
        {
          /** 命令正则匹配 */
          reg: '^拍拍$',
          /** 执行方法 */
          fnc: 'patPat',
        },
      ],
    });
  }

  /** 速速挨打 */
  async beatingFast(e) {
    //消息图片数组
    let messageImg = [
      'xiaopaimengzouta.gif',
      'xiaopaimengzouta_1.gif',
      'xiaopaimengzouta_2.gif',
      'xiaopaimengzouta_3.gif',
      'xiaopaimengzouta_4.gif',
      'xiaopaimengzouta_5.jpg',
    ];
    const message = e.message;

    //存储挨打人qq变量
    let atQq = getAtQq('1', e);

    if (atQq) {
      //获取项目运行路径
      const _path = process.cwd();
      //获取发送图片序号
      const imgIndex = rand(0, messageImg.length - 1);

      const text = '\n接受我的暴打';
      let msg = [
        //@用户
        segment.at(atQq),
        //文本消息
        text,
        //图片
        segment.image(`file:///${_path}/resources/img/${messageImg[imgIndex]}`),
      ];
      e.reply(msg);
    } else if (message.length == 1) {
      logger.info(`[速速挨打插件] 请选择需要@的人`);
      e.reply('请@一个人进行揍他操作');
    }

    //返回true 阻挡消息不再往下
    return true;
  }

  async patPat(e) {
    const message = e.message;
    //存储挨打人qq变量
    let atQq = getAtQq('2', e);

    if (atQq) {
      //获取项目运行路径
      const _path = process.cwd();

      const text = '\n进行一个拍的拍';
      let msg = [
        //@用户
        segment.at(atQq),
        //文本消息
        text,
        //图片
        segment.image(`file:///${_path}/resources/img/paipai.gif`),
      ];
      e.reply(msg);
    } else if (message.length == 1) {
      logger.info(`[速速挨打插件] 请选择需要@的人`);
      e.reply('请@一个人进行拍拍操作');
    }

    //返回true 阻挡消息不再往下
    return true;
  }
}

function getAtQq(funType, e) {
  let atQq;
  //获取发起人发送消息
  const message = e.message;

  //循环遍历发起人发送消息，获取挨打人qq号
  for (let i in message) {
    if (message[i].type == 'at') {
      if (message[i].qq == Bot.uin) {
        notBeatMsg(funType, '1', e);
        return;
      } else if (message[i].qq == BotCfg.masterQQ) {
        //上面if内，填写自己的qq，可以规避不挨打
        notBeatMsg(funType, '2', e);
        return;
      } else {
        atQq = message[i].qq;
      }
    }
  }

  return atQq;
}

function notBeatMsg(funType, type, e) {
  //获取项目运行路径
  const _path = process.cwd();

  let text;
  let funText;

  if (funType == '1') {
    funText = '揍';
  } else {
    funText = '拍';
  }

  if (type == '1') {
    text = `\n不可以${funText}我！`;
  } else if (type == '2') {
    text = `\n不可以${funText}我的主人！`;
  }

  let msg = [
    //@用户
    segment.at(e.user_id),
    //文本消息
    text,
    //图片
    segment.image(`file:///${_path}/resources/img/angri.png`),
  ];
  e.reply(msg);
}

function rand(m, n) {
  return Math.ceil(Math.random() * (n - m + 1) + m - 1);
}
