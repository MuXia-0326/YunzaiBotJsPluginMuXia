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

????????????<br/>
[![?????????](https://profile-counter.glitch.me/MuXia-js-plugin/count.svg)](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia)

### ??????????????????????????????????????? star ???

logo ????????????[??????????????????](https://www.pixiv.net/users/62635184)???????????????

</div>

# ????????????

**????????????????????????????????????????????????????????????????????????**
## ????????????

| ???????????? | ?????? v2 | ?????? v3 | ?????????????????? | ???????????? |
| ------ | ------ | ------- | ---------- | ------- |
| ???????????? | ??? | ??? | [muxia_get_day_news.js](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/blob/master/muxia_get_day_news.js) | [????????????????????????](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/tree/master/pluginHelp/get_day_news.md) |
| 60s ?????? | ??? | ??? | [muxia_get_60s_day_news.js](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/blob/master/muxia_get_60s_day_news.js) | [60s ??????????????????](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/tree/master/pluginHelp/get_60s_day_news.md) |
| ????????????????????? | ??? | ??? | [muxia_repeater.js](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/blob/master/muxia_repeater.js) | [?????????????????????????????????](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/tree/master/pluginHelp/recall_bot_msg.md) |
| ????????? | ??? | ??? | [muxia_hot_search.js](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/blob/master/muxia_hot_search.js) | [?????????????????????](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/tree/master/pluginHelp/hot_search.md) |
| ???????????? | ??? | ??? | [muxia_repeater.js](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/blob/master/muxia_repeater.js) | [????????????????????????](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/tree/master/pluginHelp/repeater.md) |
| ????????? | ??? | ??? | [muxia_duck_img.js](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/blob/master/muxia_duck_img.js) | [?????????????????????](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/tree/master/pluginHelp/duck_img.md) |
| ???????????? | ??? | ??? | [muxia_beating_fast.js](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/blob/master/muxia_beating_fast.js) | [????????????????????????](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/tree/master/pluginHelp/beating_fast.md) |
| ??????????????? | ??? | ??? | [muxia_can_not_hit.js](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/blob/master/muxia_can_not_hit.js) | [???????????????????????????](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/tree/master/pluginHelp/can_not_hit.md) |
| ???????????? | ??? | ??? | [muxia_mute_commdity.js](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/blob/master/muxia_mute_commdity.js) | [????????????????????????](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/tree/master/pluginHelp/mute_commdity.md) |

## ????????????

### ?????????????????????????????????????????????

| ???????????? | ?????? v2 | ?????? v3 | ????????? |  ?????????????????? | ???????????? |
| ------- | ------ | ------ | ----- | ----------- | ------- |
| ?????? | ??? | ??? | [cat.js](https://gitee.com/koinori/Icepray-plugin/blob/master/apps/cat.js) | [refactorCode/animal.js](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/blob/master/refactorCode/animal.js) | [??????????????????](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/tree/master/pluginHelp/animal.md) |
| ???????????? | ??? | ??? | [dawo.js](https://github.com/SmallK111407/earth-k-plugin/blob/master/apps/dawo.js) | [refactorCode/guessingGame.js](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/blob/master/refactorCode/guessingGame.js) | [????????????????????????](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/tree/master/pluginHelp/guessingGame.md) |
| ?????? | ??? | ??? | [sese.js](https://github.com/SmallK111407/earth-k-plugin/blob/master/apps/sese.js) | [refactorCode/pixiv.js](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/blob/master/refactorCode/pixiv.js) | [??????????????????](https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia/tree/master/pluginHelp/pixiv.md) |

## ????????????

-   **windows ??????**

    -   `????????????`????????????
        1. ??? `muxia` ????????? js ??????????????? `..\Yunzai-Bot\plugins\example` ?????????
        2. ??? img ?????????????????????`..\Yunzai-Bot\resources\img`????????????`resources`???????????????`img`??????,??????????????????
    -   `????????????`????????????
        1. ??? `refactorCode` ???????????? js ??????????????? `..\Yunzai-Bot\plugins\example`

-   **linux ??????**

    -   **???????????? (?????? ?????? ?????? ?????? ??????)**

        **??? Yunzai-Bot ?????????????????????**

        ```sh
        cd plugins
        git clone https://github.com/MuXia-0326/YunzaiBotJsPluginMuXia.git ./muxia
        ```

    -   `????????????`????????????

        ??? **`Yunzai-Bot/plugins`** ??????????????????????????????

        ```sh
        mv muxia/*.js example
        cd ..
        mkdir resources/img
        cd plugins
        mv muxia/img/* resources/img
        ```

    -   `????????????`????????????

        ??? **`Yunzai-Bot/plugins`** ??????????????????????????????

        ```sh
        mv muxia/refactorCode/*.js example
        ```

## ????????????

- 2022-10-08 ??????????????????????????????????????????????????????????????????**?????????????????????**??????
- 2022-10-09 ??????**?????????**???**????????????**??????
- 2022-10-11 ??????**?????????**????????? js ????????????
- 2022-10-14 ??????**60s ????????????**?????????????????????????????????
- 2022-10-19 ????????? js ???????????????????????????????????????????????????
- 2022-10-22 ??? **????????????** ??????????????????????????????????????????

## ????????????

1. ?????????????????????????????????????????????????????? Yunzai-Bot ???????????????????????????????????????????????????.
2. ????????????????????????????????????????????????????????????????????????????????????????????????????????????.

## ??????

-   ?????????374900636
-   [Yunzai-Bot](https://github.com/Le-niao/Yunzai-Bot)
-   Yunzai-Bot ????????????[???github](https://github.com/yhArcadia/Yunzai-Bot-plugins-index) [???gitee (git![](https://raw.githubusercontent.com/MuXia-0326/YunzaiBotJsPluginMuXia/master/readme/e_.ico)![](https://raw.githubusercontent.com/MuXia-0326/YunzaiBotJsPluginMuXia/master/readme/e_.ico))](https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index)
