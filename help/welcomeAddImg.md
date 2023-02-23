# 进群通知添加图片指南

1. 首先找到项目中实现该功能的js插件
文件存储路径 `Yunzai-bot/plugins/example/进群退群通知.js`

![](https://raw.githubusercontent.com/MuXia-0326/YunzaiBotJsPluginMuXia/master/help/img/welcome1.png)

2. 找到代码的28行

![](https://raw.githubusercontent.com/MuXia-0326/YunzaiBotJsPluginMuXia/master/help/img/welcome2.png)

```js
/** 回复 */
await this.reply([
    segment.at(this.e.user_id),
    // segment.image(),
    msg
])
```

3. 将第二步提到的代码修改成下面的样子

```js
//获取项目运行路径
const _path = process.cwd();

/** 回复 */
await this.reply(
    [segment.at(this.e.user_id), 
    msg, 
    segment.image(`file:///${_path}/resources/img/welcome.jpg`)]
);
```

4. 然后找一张心仪的图片，将图片的重命名为 `welcome.jpg` 再将图片复制到
`Yunzai-bot/resources/img` 目录下

一般情况下 `resources` 目录下都没有 `img` 目录,所以需要自行手动创建一个

![](https://raw.githubusercontent.com/MuXia-0326/YunzaiBotJsPluginMuXia/master/help/img/welcome3.png)

5. 最后，重启bot，再拉一个好朋友（工具人）测试一下，功能是否修改成功即可
