# 色色使用帮助文档

## 使用方法

### 此插件有封号风险，请酌情使用

使用 **来点色图** 主动触发，拥有图文开关默认为文字模式

![](https://raw.githubusercontent.com/MuXia-0326/YunzaiBotJsPluginMuXia/master/pluginHelp/imgs/pixiv/1.png)

> 获取的图片会在一定时间内撤回

使用 #设置图片数量[数量] 修改单次返回的图片数量，默认返回三张

使用 #开启 18 群聊 / #开启 18 私聊 开启 18 开关

使用 #关闭 18 群聊 / #关闭 18 私聊 关闭 18 开关

群聊私聊相互独立

**上述三个设置，在重启 bot 后需要会失效重新设置，需要永久修改，请自行修改`refactorCode/pixiv.js`文件，有注解标注位置**

## 配置指南

#### 重要提示

**以下所有操作都是在，打开项目里面的 `refactorCode/pixiv.js` 文件前提下进行操作的**

18开关
 
* 0-代表关
* 1-代表开

撤回时间

单位为秒（s）,0为不撤回

![](https://raw.githubusercontent.com/MuXia-0326/YunzaiBotJsPluginMuXia/master/pluginHelp/imgs/pixiv/3.png)

2022-10-22 新增图文模式切换开关

![](https://raw.githubusercontent.com/MuXia-0326/YunzaiBotJsPluginMuXia/master/pluginHelp/imgs/pixiv/2.png)

* 0-代表文字模式
* 1-代表图片模式

> 文字模式比图片模式发送成功率更高，机器人被封号的可能性越低，根据自己的需求选择