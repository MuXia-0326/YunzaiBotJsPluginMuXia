/*
 * @Author: MuXia
 * @Date: 2022/09/16
 */
import { segment } from "oicq";
import plugin from "../../lib/plugins/plugin.js";

export class catNotHit extends plugin {
    constructor() {
        super({
            name: "不可以打人",
            dsc: "不可以打人",
            /** https://oicqjs.github.io/oicq/#events */
            event: "message.group",
            priority: 1000,
            rule: [
                {
                    /** 命令正则匹配 */
                    reg: "^[\\s\\S]*(挨打|挨锤|揍他)$",
                    /** 执行方法 */
                    fnc: "catNotHit"
                }
            ]
        });
    }

    async catNotHit(e) {
        //获取项目运行路径
        const _path = process.cwd();

        const text = "\n不可以打人，要和平";
        let msg = [
            //@用户
            segment.at(e.user_id),
            //文本消息
            text,
            //图片
            segment.image(`file:///${_path}/resources/img/hutaokeai.gif`)
        ];
        e.reply(msg);

        //返回true 阻挡消息不再往下
        return true;
    }
}
