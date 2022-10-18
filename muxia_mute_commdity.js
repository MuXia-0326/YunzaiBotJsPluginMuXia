/*
 * @Author: MuXia
 * @Date: 2022/09/16
 */
import { segment } from "oicq";
import plugin from "../../lib/plugins/plugin.js";

/**
 * 配置违禁词
 * 多个违禁词请用 | 隔开
 * 如：群主女装|给我色色
 */
const forbiddenWord = "群主挨打";

/**
 * 触发违禁词时 机器人的回复语句
 */
const replyStatement = "不可以打群主，看我禁言你！";

export class muteCommdity extends plugin {
    constructor() {
        super({
            name: "禁言套餐",
            dsc: "打群主就得禁言",
            /** https://oicqjs.github.io/oicq/#events */
            event: "message.group",
            priority: 500,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: `^.*(${forbiddenWord}).*`,
                    /** 执行方法 */
                    fnc: "muteCommdity"
                },
                {
                    /** 命令正则匹配 */
                    reg: "^#添加.*(群主).*$",
                    /** 执行方法 */
                    fnc: "canNotAddEmoji"
                }
            ]
        });
    }

    /** 禁言套餐 */
    async muteCommdity(e) {
        //撤回不合规发言
        e.group.recallMsg(e.message_id);
        //项目路径
        const _path = process.cwd();
        //获取随机图片序号
        const imgIndex = rand(1, 4);

        //发送消息
        const text = `\n${replyStatement}`;
        let msg = [
            //@用户
            segment.at(e.user_id),
            //文本消息
            text,
            //图片
            segment.image(`file:///${_path}/resources/img/paimengkeai_${imgIndex}.png`)
        ];
        e.reply(msg);

        if (e.isGroup) {
            // 禁言群友 填写单位为秒s
            e.group.muteMember(e.user_id, 60);
        }

        //返回true 阻挡消息不再往下
        return true;
    }

    async canNotAddEmoji(e) {
        //撤回不合规发言
        e.group.recallMsg(e.message_id);
        //项目路径
        const _path = process.cwd();

        //发送消息
        const text = "\n不可以添加群主相关的表情";
        let msg = [
            //@用户
            segment.at(e.user_id),
            //文本消息
            text,
            //图片
            segment.image(`file:///${_path}/resources/img/angri.png`)
        ];
        e.reply(msg);

        //返回true 阻挡消息不再往下
        return true;
    }
}

//获取随机数方法
function rand(m, n) {
    return Math.ceil(Math.random() * (n - m + 1) + m - 1);
}
