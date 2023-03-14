<p align="center">
  <a href="https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia">
    <img width="200" src="https://raw.githubusercontent.com/MuXia-0326/YunzaiBotJsPluginMuXia/master/readme/project_logo.png">
  </a>
</p>

<div align="center">

<h1>MuXia-js-plugin</h1>

[![](https://img.shields.io/badge/Yunzai-v3.0.0-f0f0f0?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxMiA4NS4zMzNhODUuMzMzIDg1LjMzMyAwIDAgMSA4NS4zMzMgODUuMzM0YzAgMzEuNTczLTE3LjA2NiA1OS4zMDYtNDIuNjY2IDczLjgxM3Y1NC4xODdoNDIuNjY2QTI5OC42NjcgMjk4LjY2NyAwIDAgMSA4OTYgNTk3LjMzM2g0Mi42NjdBNDIuNjY3IDQyLjY2NyAwIDAgMSA5ODEuMzMzIDY0MHYxMjhhNDIuNjY3IDQyLjY2NyAwIDAgMS00Mi42NjYgNDIuNjY3SDg5NnY0Mi42NjZhODUuMzMzIDg1LjMzMyAwIDAgMS04NS4zMzMgODUuMzM0SDIxMy4zMzNBODUuMzMzIDg1LjMzMyAwIDAgMSAxMjggODUzLjMzM3YtNDIuNjY2SDg1LjMzM0E0Mi42NjcgNDIuNjY3IDAgMCAxIDQyLjY2NyA3NjhWNjQwYTQyLjY2NyA0Mi42NjcgMCAwIDEgNDIuNjY2LTQyLjY2N0gxMjhhMjk4LjY2NyAyOTguNjY3IDAgMCAxIDI5OC42NjctMjk4LjY2Nmg0Mi42NjZWMjQ0LjQ4Yy0yNS42LTE0LjUwNy00Mi42NjYtNDIuMjQtNDIuNjY2LTczLjgxM0E4NS4zMzMgODUuMzMzIDAgMCAxIDUxMiA4NS4zMzNNMzIwIDU1NC42NjdhMTA2LjY2NyAxMDYuNjY3IDAgMCAwLTEwNi42NjcgMTA2LjY2NkExMDYuNjY3IDEwNi42NjcgMCAwIDAgMzIwIDc2OGExMDYuNjY3IDEwNi42NjcgMCAwIDAgMTA2LjY2Ny0xMDYuNjY3QTEwNi42NjcgMTA2LjY2NyAwIDAgMCAzMjAgNTU0LjY2N20zODQgMGExMDYuNjY3IDEwNi42NjcgMCAwIDAtMTA2LjY2NyAxMDYuNjY2QTEwNi42NjcgMTA2LjY2NyAwIDAgMCA3MDQgNzY4YTEwNi42NjcgMTA2LjY2NyAwIDAgMCAxMDYuNjY3LTEwNi42NjdBMTA2LjY2NyAxMDYuNjY3IDAgMCAwIDcwNCA1NTQuNjY3eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==)](https://github.com/Le-niao/Yunzai-Bot) [![](https://img.shields.io/badge/%E7%BE%A4%E5%8F%B7-374900636-bce4e3?style=flat-square&logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjY1MzY4Mjk4NTkzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEzNzA5IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxwYXRoIGQ9Ik04MjQuOCA2MTMuMmMtMTYtNTEuNC0zNC40LTk0LjYtNjIuNy0xNjUuM0M3NjYuNSAyNjIuMiA2ODkuMyAxMTIgNTExLjUgMTEyIDMzMS43IDExMiAyNTYuMiAyNjUuMiAyNjEgNDQ3LjljLTI4LjQgNzAuOC00Ni43IDExMy43LTYyLjcgMTY1LjMtMzQgMTA5LjUtMjMgMTU0LjgtMTQuNiAxNTUuOCAxOCAyLjIgNzAuMS04Mi40IDcwLjEtODIuNCAwIDQ5IDI1LjIgMTEyLjkgNzkuOCAxNTktMjYuNCA4LjEtODUuNyAyOS45LTcxLjYgNTMuOCAxMS40IDE5LjMgMTk2LjIgMTIuMyAyNDkuNSA2LjMgNTMuMyA2IDIzOC4xIDEzIDI0OS41LTYuMyAxNC4xLTIzLjgtNDUuMy00NS43LTcxLjYtNTMuOCA1NC42LTQ2LjIgNzkuOC0xMTAuMSA3OS44LTE1OSAwIDAgNTIuMSA4NC42IDcwLjEgODIuNCA4LjUtMS4xIDE5LjUtNDYuNC0xNC41LTE1NS44eiIgcC1pZD0iMTM3MTAiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48L3N2Zz4=)](https://jq.qq.com/?_wv=1027&k=ygij7e1m) [![](https://img.shields.io/github/stars/MuXia-0326/YunzaiBotJsPluginMuXia?color=bf6e6b&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI%2FPjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI%2BPHN2ZyB0PSIxNjY1MzY5MDIzNzI2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE0NjYzIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxwYXRoIGQ9Ik0yODQuNDU4NjY3IDk0MS4zOTczMzNjLTM2LjQzNzMzMyAxNS42MzczMzMtNjguNDgtNy42OC02NC44OTYtNDcuMTY4bDIyLjYxMzMzMy0yNDguOTE3MzMzLTE2NC4zOTQ2NjctMTg4LjA1MzMzM2MtMjYuMDY5MzMzLTI5LjgyNC0xMy42NTMzMzMtNjcuNTYyNjY3IDI0Ljc4OTMzNC03Ni4zMDkzMzRsMjQzLjM3MDY2Ni01NS4zODEzMzMgMTI3Ljc4NjY2Ny0yMTQuNjc3MzMzYzIwLjI4OC0zNC4wOTA2NjcgNTkuOTQ2NjY3LTM0LjA2OTMzMyA4MC4yMTMzMzMgMGwxMjcuNzg2NjY3IDIxNC42NzczMzMgMjQzLjM3MDY2NyA1NS4zODEzMzNjMzguNjU2IDguNzg5MzMzIDUwLjg1ODY2NyA0Ni40ODUzMzMgMjQuNzg5MzMzIDc2LjMwOTMzNGwtMTY0LjM5NDY2NyAxODguMDUzMzMzIDIyLjc0MTMzNCAyNDkuMDAyNjY3YzMuNjA1MzMzIDM5LjUwOTMzMy0yOC40NTg2NjcgNjIuODA1MzMzLTY0Ljg5NiA0Ny4xNDY2NjZsLTIyOS41MDQtOTguNTE3MzMzLTIyOS4zNzYgOTguNDUzMzMzeiIgZmlsbD0iI2ZmZmZmZiIgcC1pZD0iMTQ2NjQiPjwvcGF0aD48L3N2Zz4%3D&style=flat-square)](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia)

</div>

<div align="center">

访问人数<br/>
[![访问量](https://profile-counter.glitch.me/MuXia-js-plugin/count.svg)](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia)

### 如果觉得本项目好用，点一个 star 吧

logo 来自画师[ｍｅｍｅｎｏ](https://www.pixiv.net/users/62635184)，强烈安利

</div>

> 由于最近oicq出现登录异常的问题，不少朋友将yunzaibot换成的icqq的版本，出现定时任务无法正常发送的情况，请按下面的提示进行修改，即可恢复定时推送的功能
```js
找到项目中的
import { Group, segment } from "oicq";
修改成下面的样子
import { Group, segment } from "icqq";
```


# 插件列表

**有插件配置问题，优先看使用说明，不懂的再加群询问**
## 原创插件

| 插件名称 | 支持 v2 | 支持 v3 | 对应项目文件 | 使用帮助 |
| ------ | ------ | ------- | ---------- | ------- |
| 今日日报 | ❌ | ✔ | [muxia_get_day_news.js](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/blob/master/muxia_get_day_news.js) | [今日日报使用帮助](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/tree/master/pluginHelp/get_day_news.md) |
| 60s 日报 | ❌ | ✔ | [muxia_get_60s_day_news.js](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/blob/master/muxia_get_60s_day_news.js) | [60s 日报使用帮助](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/tree/master/pluginHelp/get_60s_day_news.md) |
| 撤回机器人消息 | ❌ | ✔ | [muxia_recall_bot_msg.js](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/blob/master/muxia_recall_bot_msg.js) | [撤回机器人消息使用帮助](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/tree/master/pluginHelp/recall_bot_msg.md) |
| 热搜榜 | ❌ | ✔ | [muxia_hot_search.js](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/blob/master/muxia_hot_search.js) | [热搜榜使用帮助](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/tree/master/pluginHelp/hot_search.md) |
| 自动复读 | ❌ | ✔ | [muxia_repeater.js](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/blob/master/muxia_repeater.js) | [自动复读使用帮助](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/tree/master/pluginHelp/repeater.md) |
| 鸭鸭照 | ❌ | ✔ | [muxia_duck_img.js](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/blob/master/muxia_duck_img.js) | [鸭鸭照使用帮助](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/tree/master/pluginHelp/duck_img.md) |
| 速速挨打 | ❌ | ✔ | [muxia_beating_fast.js](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/blob/master/muxia_beating_fast.js) | [速速挨打使用帮助](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/tree/master/pluginHelp/beating_fast.md) |
| 不可以打人 | ❌ | ✔ | [muxia_can_not_hit.js](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/blob/master/muxia_can_not_hit.js) | [不可以打人使用帮助](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/tree/master/pluginHelp/can_not_hit.md) |
| 禁言套餐 | ❌ | ✔ | [muxia_mute_commdity.js](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/blob/master/muxia_mute_commdity.js) | [禁言套餐使用帮助](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/tree/master/pluginHelp/mute_commdity.md) |

## 重构插件

### 重构插件如有侵权，请联系我删除

| 插件名称 | 支持 v2 | 支持 v3 | 重构自 |  对应项目文件 | 使用帮助 |
| ------- | ------ | ------ | ----- | ----------- | ------- |
| 动物 | ❌ | ✔ | [cat.js](https://gitee.com/koinori/Icepray-plugin/blob/master/apps/cat.js) | [refactorCode/animal.js](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/blob/master/refactorCode/animal.js) | [动物使用帮助](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/tree/master/pluginHelp/animal.md) |
| 猜拳游戏 | ❌ | ✔ | [dawo.js](https://github.com/SmallK111407/earth-k-plugin/blob/master/apps/dawo.js) | [refactorCode/guessingGame.js](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/blob/master/refactorCode/guessingGame.js) | [猜拳游戏使用帮助](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/tree/master/pluginHelp/guessingGame.md) |
| 色色 | ❌ | ✔ | [sese.js](https://github.com/SmallK111407/earth-k-plugin/blob/master/apps/sese.js) | [refactorCode/pixiv.js](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/blob/master/refactorCode/pixiv.js) | [色色使用帮助](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/tree/master/pluginHelp/pixiv.md) |

## 使用指南

-   **windows 系统**

    -   `原创插件`使用方法
        1. 将 `muxia` 开头的 js 文件复制到 `..\Yunzai-Bot\plugins\example` 目录下
        2. 将 img 下的文件复制到`..\Yunzai-Bot\resources\img`目录下，`resources`目录下没有`img`目录,自行新建一个
    -   `重构插件`使用方法
        1. 将 `refactorCode` 目录下的 js 文件复制到 `..\Yunzai-Bot\plugins\example`

-   **linux 系统**

    -   **前置操作 (重要 重要 重要 重要 重要)**

        **在 Yunzai-Bot 项目目录下执行**

        ```sh
        cd plugins
        git clone https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia.git ./muxia
        ```

    -   `原创插件`使用方法

        在 **`Yunzai-Bot/plugins`** 目录下执行下面的命令

        ```sh
        mv muxia/*.js example
        cd ..
        mkdir resources/img
        cd plugins
        mv muxia/img/* resources/img
        ```

    -   `重构插件`使用方法

        在 **`Yunzai-Bot/plugins`** 目录下执行下面的命令

        ```sh
        mv muxia/refactorCode/*.js example
        ```

## 更新日志

- 2022-10-08 今日日报添加定时触发，优化部分提示异常，新增**撤回机器人消息**插件
- 2022-10-09 新增**热搜榜**和**自动复读**插件
- 2022-10-11 新增**鸭鸭照**，修改 js 文件名称
- 2022-10-14 新增**60s 读懂世界**插件，上传部分重构插件
- 2022-10-19 为每个 js 插件单独编写一个使用方法，方便查阅
- 2022-10-22 给 **色色插件** 添加图文开关，默认为文字模式
- 2023-02-17 修复 **60s日报插件** 自动推送异常的问题
- 2023-02-28 **鸭鸭照插件** 每日自动问好功能，新增了猫猫，柴犬，小鸟

## 免责声明

1. 功能仅限内部交流与小范围使用，请勿将 Yunzai-Bot 及本项目用于任何以盈利为目的的场景.
2. 图片与其他素材均来自于网络，仅供交流学习使用，如有侵权请联系，会立即删除.

## 其他

-   群号：374900636
-   Yunzai-Bot：[☞Github](https://github.com/Le-niao/Yunzai-Bot) / [☞Git![](https://raw.githubusercontent.com/MuXia-0326/YunzaiBotJsPluginMuXia/master/readme/e_.ico)![](https://raw.githubusercontent.com/MuXia-0326/YunzaiBotJsPluginMuXia/master/readme/e_.ico)](https://gitee.com/Le-niao/Yunzai-Bot) 
-   Yunzai-Bot轻量版(无原神功能)：[☞Github](https://github.com/Nwflower/yunzai-bot-lite) / [☞Git![](https://raw.githubusercontent.com/MuXia-0326/YunzaiBotJsPluginMuXia/master/readme/e_.ico)![](https://raw.githubusercontent.com/MuXia-0326/YunzaiBotJsPluginMuXia/master/readme/e_.ico)](https://gitee.com/Nwflower/yunzai-bot-lite)
-   Yunzai-Bot 插件库：[☞github](https://github.com/yhArcadia/Yunzai-Bot-plugins-index) / [☞Git![](https://raw.githubusercontent.com/MuXia-0326/YunzaiBotJsPluginMuXia/master/readme/e_.ico)![](https://raw.githubusercontent.com/MuXia-0326/YunzaiBotJsPluginMuXia/master/readme/e_.ico)](https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index)
