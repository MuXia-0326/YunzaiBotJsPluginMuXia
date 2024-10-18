/*
 * @Author: MuXia
 * @Date: 2022/09/16
 */
import plugin from '../../lib/plugins/plugin.js';

export class recallBotMsg extends plugin {
  constructor() {
    super({
      name: '撤回机器人消息',
      dsc: '回复机器人信息，让其自主撤回',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message.group',
      priority: 1000,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '^撤回$',
          /** 执行方法 */
          fnc: 'recallBotMsg',
        },
      ],
    });
  }

  async recallBotMsg(e) {
    if (e.atBot) {
      if (e.source) {
        e.group.recallMsg(e.source.seq, e.source.rand);
      } else {
        e.reply('请回复需要撤回消息');
      }

      if (e.group.is_admin && e.source.role != 'owner') {
        e.group.recallMsg(e.message_id);
      }
    } else {
      e.reply('请回复需要撤回消息');
    }

    //返回true 阻挡消息不再往下
    return true;
  }
}
