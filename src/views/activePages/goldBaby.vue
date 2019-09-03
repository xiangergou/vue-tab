<template>
  <div class="container">
    <div class="header"></div>
    <div class="content">
      <ul class="tab">
        <li class="tab-item" @click="active = 0" :class="{'tab-item-active': active == 0}">大咖榜</li>
        <li class="tab-item" @click="active = 1" :class="{'tab-item-active': active == 1}">主播榜</li>
        <li class="tab-item" @click="active = 2" :class="{'tab-item-active': active == 2}">新秀榜</li>
      </ul>
      <div class="table">
        <div class="bg-top"></div>
        <div class="bg-bottom"></div>
        <table cellpadding="0" cellspacing="0" v-show="active != 2">
          <thead>
            <th width="20"></th>
            <th class="colorGold userAvatar">明星</th>
            <th width="200">粉丝影响指数</th>
            <th width="200">内容消费指数</th>
            <th width="200">商业转化指数</th>
            <th width="110" class="colorGold">淘指数</th>
            <th width="80">合作</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tableData" :key="index">
              <td class="colorGold">{{ index + 1 }}</td>
              <td class="colorGold userAvatar">
                <div class="avatar" :style="{backgroundImage:'url(' + item.url + ')'}"></div>
                {{ item.name }}
              </td>
              <td>{{ Math.round(item.fans) }}</td>
              <td>{{ Math.round(item.content) }}</td>
              <td>{{ Math.round(item.trade) }}</td>
              <td class="colorGold">{{ Math.round(item.tao) }}</td>
              <td>
                <img src="https://img.alicdn.com/tfs/TB1k.2XJxTpK1RjSZR0XXbEwXXa-25-24.png"
                class="go"
                :class="{grey: !item.cooperate}"
                @click="goto(item.cooperate)"
                >
              </td>
            </tr>
          </tbody>
        </table>
        <div v-show="active == 2">
          <div class="three-set top">
            <div class="navs" v-for="(item, index) in oneLine" :key="index">
              <div class="avatar-container">
                <div class="avatar" :style="{backgroundImage:'url(' + item.url + ')'}"></div>
              </div>
              <img class="hexagon" :src="hexagon">
              <a class="item" target="_blank" :href="item.cooperate">
                <img :src="goldArrow">
              </a>
              <div class="text colorGold">{{ item.name }}</div>
            </div>
          </div>
          <div class="three-set">
            <div class="navs" v-for="(item, index) in twoLine" :key="index">
              <div class="avatar-container">
                <div class="avatar" :style="{backgroundImage:'url(' + item.url + ')'}"></div>
              </div>
              <img class="hexagon" :src="hexagon">
              <a class="item" target="_blank" :href="item.cooperate">
                <img :src="goldArrow">
              </a>
              <div class="text colorGold">{{ item.name }}</div>
            </div>
          </div>
          <div class="three-set four bottom">
            <div class="navs" v-for="(item, index) in threeLine" :key="index">
              <div class="avatar-container">
                <div class="avatar" :style="{backgroundImage:'url(' + item.url + ')'}"></div>
              </div>
              <img class="hexagon" :src="hexagon">
              <a class="item" target="_blank" :href="item.cooperate">
                <img :src="goldArrow">
              </a>
              <div class="text colorGold">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-bottom">
      <div class="show-text">该榜单联合淘榜单、阿里v任务共同发布，基于媒体、红人全网的粉丝影响力及内容传播数据，结合淘系线上消费大数据，打通内容营销全链路</div>
    </div>
  </div>
</template>

<script>
import { deepClone } from '~/utils/tool'
const goldArrow = require('~/assets/images/gold-arrow.png')
const hexagon = require('~/assets/images/hexagon.png')
export default {
  name: 'jingying',
  data () {
    return {
      active: 0,
      goldArrow,
      hexagon,
      defaultData: {
        daka: [
          {
            'name': '贝贝粒育儿百科',
            'fans': 982.4767279284151,
            'content': 785.5184067572567,
            'trade': 635.4536901087539,
            'tao': 888.6869277951014,
            'url': 'https://img.alicdn.com/imgextra/i3/4040240696/TB2gXbphhtnkeRjSZSgXXXAuXXa_!!4040240696-2-beehive-scenes.png',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.13b24accVNmH6o&userId=4040240696'
          },
          {
            'name': 'Onlylady女人志',
            'fans': 861.1233464835786,
            'content': 767.8275270984925,
            'trade': 947.4115437006635,
            'tao': 841.7634203897613,
            'url': 'https://txws-test.oss-cn-qingdao.aliyuncs.com/image/20190414/20190414_0ed68da6b391421999b4c6f3a6ee54a8.png',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.3a1a4accB40bLt&userId=2233054360'
          },
          {
            'name': '奶爹汪司徒',
            'fans': 844.8016323590202,
            'content': 851.2531784286865,
            'trade': 789.4049553787282,
            'tao': 841.1974284818909,
            'url': 'https://img.alicdn.com/imgextra/i3/32234056/TB2rrBHchPI8KJjSspoXXX6MFXa_!!32234056-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.224d4accaXx4Jo&userId=32234056'
          },
          {
            'name': '闺蜜美妆kimiss',
            'fans': 829.2203338479376,
            'content': 597.7369077745058,
            'trade': 696.7933336884564,
            'tao': 746.5326060099599,
            'url': 'https://txws-test.oss-cn-qingdao.aliyuncs.com/image/20190414/20190414_1611ba8bff2f4c488b906c807e7feff9.jpeg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.802.1.79c34accX5s87R&userId=2676744352'
          },
          {
            'name': '小伶玩具_伶可家族',
            'fans': 803.9726776014215,
            'content': 578.5473049481383,
            'trade': 409.88138912715806,
            'tao': 696.9359369580102,
            'url': 'https://txws-test.oss-cn-qingdao.aliyuncs.com/image/20190414/20190414_72900adb50084a60b2271c863921aca6.png'
          },
          {
            'name': '喵爸村村长',
            'fans': 987.6915746974383,
            'content': 203.12924018863131,
            'trade': 296.3211964504823,
            'tao': 683.1858365201006,
            'url': 'https://txws-test.oss-cn-qingdao.aliyuncs.com/image/20190414/20190414_1d77d012e1224144b490d7843b6378d6.png',
            'cooperate': 'https://market.m.taobao.com/apps/abs/9/41/index?ut_sk=1.W/eDwSvMrdQDADxP1442P7t%2B_21380790_1555226705588.DingTalk.4&wh_weex=true&pageId=6273&accountId=3694607047&suid=8D4DAEFC-54C4-4A1D-B0BD-39FC7A6C86C3&spm=a211i5.10638400'
          },
          {
            'name': '凯叔讲故事旗舰店',
            'fans': 724.2596568443333,
            'content': 505.1470315976745,
            'trade': 320.2879959685035,
            'tao': 618.1287031827527,
            'url': 'https://txws-test.oss-cn-qingdao.aliyuncs.com/image/20190414/20190414_77c6a70130884be6ad985af8e1a3d123.png'
          },
          {
            'name': '丁香医生',
            'fans': 893,
            'content': 205,
            'trade': 154,
            'tao': 613,
            'url': 'https://txws-test.oss-cn-qingdao.aliyuncs.com/image/20190414/20190414_25155d8007144989ae0974aa1c78945c.jpeg'
          },
          {
            'name': '崔玉涛的育学园',
            'fans': 794.0777411613517,
            'content': 242.89515809529632,
            'trade': 164.82330878742872,
            'tao': 565.7975230041428,
            'url': 'https://img.alicdn.com/imgextra/i1/3583093721/TB2FvFHch1YBuNjy1zcXXbNcXXa_!!3583093721-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.7eb24accu560U8&userId=3583093721'
          }
        ],
        zhubo: [
          {
            'name': '薇娅viya',
            'fans': 1000,
            'content': 992,
            'trade': 1000,
            'tao': 997,
            'url': 'https://img.alicdn.com/imgextra/i2/69226163/TB2YEitX3aTBuNjSszfXXXgfpXa_!!69226163-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.64584accjPMlEI&userId=69226163'
          },
          {
            'name': '烈儿宝贝',
            'fans': 987,
            'content': 961,
            'trade': 1000,
            'tao': 986,
            'url': 'https://img.alicdn.com/imgextra/i3/63239528/O1CN01bTT6aL2KFsDzKxXuu_!!63239528-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.357f4accFeylvM&userId=63239528'
          },
          {
            'name': '祖艾妈',
            'fans': 962,
            'content': 946,
            'trade': 1000,
            'tao': 976,
            'url': 'https://img.alicdn.com/imgextra/i2/2104259273/TB2hszvrHArBKNjSZFLXXc_dVXa_!!2104259273-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.47184accK3lSki&userId=2104259273'
          },
          {
            'name': '政政的新装',
            'fans': 731.910324985178,
            'content': 780.170262434377,
            'trade': 718.117041532156,
            'tao': 739.491664493427,
            'url': 'https://img.alicdn.com/imgextra/i3/39094229/TB2ZvRxzAyWBuNjy0FpXXassXXa_!!39094229-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.1a7b4accMbg8nI&userId=39094229'
          },
          {
            'name': '睿妈潮童',
            'fans': 720.839986765874,
            'content': 807.858259462954,
            'trade': 686.727477382155,
            'tao': 729.889213883138,
            'url': 'http://gw1.alicdn.com/tfscom/tuitui/TB1s_pDOXXXXXaNapXXXXXXXXXX',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.23fa4accTqFe1C&userId=528807584'
          },
          {
            'name': '幼师阿曼儿',
            'fans': 773.153631488741,
            'content': 748.74058610545,
            'trade': 696.108024364526,
            'tao': 727.306914311646,
            'url': 'https://img.alicdn.com/imgextra/i2/3280211766/TB2CTLzfTXYBeNkHFrdXXciuVXa_!!3280211766-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.30e04accRZXXUP&userId=3280211766'
          },
          {
            'name': '源宝妈咪',
            'fans': 675.588854290252,
            'content': 775.064725801111,
            'trade': 689.405162059552,
            'tao': 712.33976962816,
            'url': 'https://img.alicdn.com/imgextra/i2/2035989354/O1CN012IyBGUvYt8lLZ0J_!!2035989354-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.1b814accptwjZe&userId=2035989354'
          },
          {
            'name': '乌糖妈咪',
            'fans': 714.252361475859,
            'content': 731.947613344795,
            'trade': 655.938980723778,
            'tao': 690.404246660499,
            'url': 'https://img.alicdn.com/imgextra/i2/409178895/TB2ow6TrP7nBKNjSZLeXXbxCFXa_!!409178895-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.266b4accNbV0wy&userId=409178895'
          },
          {
            'name': '周家小鱼',
            'fans': 679.25148180984,
            'content': 774.658410898248,
            'trade': 635.581837463012,
            'tao': 686.038738362949,
            'url': 'https://img.alicdn.com/imgextra/i2/2422156901/TB23_6aqstnpuFjSZFKXXalFFXa_!!2422156901-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.3ef64accEW1kZa&userId=2422156901'
          },
          {
            'name': '张心萌萌萌哒',
            'fans': 642,
            'content': 762,
            'trade': 656,
            'tao': 685,
            'url': 'https://img.alicdn.com/imgextra/i1/290811464/O1CN017HeLEJ1MgYLdmQ5AM_!!290811464-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.7ea24acc5Ebra3&userId=290811464'
          },
          {
            'name': '洁儿Abby',
            'fans': 647.530498058768,
            'content': 688.771468884825,
            'trade': 679.558638262146,
            'tao': 675.916859408274,
            'url': 'https://img.alicdn.com/imgextra/i4/2014312363/TB2vhuQkuOSBuNjy0FdXXbDnVXa_!!2014312363-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.60ab4accnvC01n&userId=2014312363'
          }
        ],
        xinxiu: [
          {
            'name': '专家-高级育婴师小淘老师',
            'url': 'https://img.alicdn.com/imgextra/i1/1103671822/O1CN01VxBMKJ1PKW77y10P1_!!1103671822-0-beehive-scenes.jpg',
            'cooperate': 'https://m.tb.cn/h.3AlfbzQ?sm=1814ff'
          },
          {
            'name': '专家-YvonBock',
            'url': 'https://txws-test.oss-cn-qingdao.aliyuncs.com/image/20190414/20190414_9970f709cc3543e7a10f628c99cd98ce.png',
            'cooperate': 'https://market.m.taobao.com/apps/abs/9/41/index?wh_\r\nweex=true&pageId=6273&wx_navbar_hidden=true&wx_navbar_transparent=true&accountId=2350325475'
          },
          {
            'name': '专家-咋整呢喵哥',
            'url': 'https://img.alicdn.com/imgextra/i4/1089089216/TB2p0SKEMmTBuNjy1XbXXaMrVXa_!!1089089216-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.220a4accNzt20M&userId=1089089216'
          },
          {
            'name': '资深玩家-BartonHong',
            'url': 'https://txws-test.oss-cn-qingdao.aliyuncs.com/image/20190414/20190414_10050f3f30ef4487b6c71daf1bf8568b.png',
            'cooperate': 'https://market.m.taobao.com/apps/abs/9/41/index?ut_sk=1.VP94ROAXZ/QDADEhxnwgru7D_21380790_1553584840715.DingTalk.4&\r\n__share__id__=1&wx_navbar_hidden=true&share_crt_v=1&wh_weex=true&pageId=6273&sourceType=other&tabString=homepage&suid=30C4894B-CB32-4C01-83F7-ED7B219EDD3A&sp_tk=77%2BlN2o1UWJDRHVmRjHvv6U%3D&accountId=2326151934&un=8596e0230bf53e20d7b9f3c5452781e0&scm=20140623.1.3.134&wx_navbar_transparent=true&cpp=1&shareurl=true&spm=a313p.22.yb.1020751696011&short_name=h.3zZyljQ&app=chrome'
          },
          {
            'name': '资深玩家-乐乐SORA',
            'url': 'https://txws-test.oss-cn-qingdao.aliyuncs.com/image/20190414/20190414_a55d3d7a62f44018ac674e01b68dc67e.png',
            'cooperate': 'https://market.m.taobao.com/apps/abs/9/41/index?wh_weex=true&pageId=6273&wx_navbar_hidden=true&wx_navbar_transparent=true&accountId=2200549600190'
          },
          {
            'name': '资深玩家-肝爆的爪老板',
            'url': 'https://txws-test.oss-cn-qingdao.aliyuncs.com/image/20190414/20190414_69318af76a3b47949344cafa1859bfc3.jpeg',
            'cooperate': 'https://market.m.taobao.com/apps/abs/9/41/index?wh_weex=true&pageId=6273&wx_navbar_hidden=true&wx_navbar_transparent=true&accountId=2750481489'
          },
          {
            'name': '设计师-小希MMT',
            'url': 'https://txws-test.oss-cn-qingdao.aliyuncs.com/image/20190414/20190414_2a332f380d2d4e0f99ebe5f01bc2f54a.png',
            'cooperate': 'https://market.m.taobao.com/apps/abs/9/41/index?wh_weex=true&pageId=6273&wx_navbar_hidden=true&wx_navbar_transparent=true&accountId=1102789662'
          },
          {
            'name': '设计师-Kurakia',
            'url': 'https://txws-test.oss-cn-qingdao.aliyuncs.com/image/20190414/20190414_46a4e8adbf5740288a8068d7e16b76df.png',
            'cooperate': 'https://market.m.taobao.com/apps/abs/9/41/index?wh_weex=true&pageId=6273&wx_navbar_hidden=true&wx_navbar_transparent=true&accountId=2027291003'
          },
          {
            'name': '设计师-是小马',
            'url': 'https://txws-test.oss-cn-qingdao.aliyuncs.com/image/20190414/20190414_8a2f72bb1fd24eab93299a0b2690fcc0.png',
            'cooperate': 'https://m.tb.cn/h.3BqWvCH?sm=3037fe'
          },
          {
            'name': '设计师-minirodini',
            'url': 'https://txws-test.oss-cn-qingdao.aliyuncs.com/image/20190414/20190414_3db9c2c859db4f9f857bd5617dc6caef.png',
            'cooperate': 'https://market.m.taobao.com/apps/abs/9/41/index?wh_weex\r\n=true&pageId=6273&wx_navbar_hidden=true&wx_navbar_transparent=true&accountId=2200676047403'
          }
        ]
      },
      tableData: [],
      oneLine: [],
      twoLine: [],
      threeLine: []
    }
  },
  created () {
    this.tableData = deepClone(this.defaultData.daka)
  },
  methods: {
    goto (url) {
      if (url) {
        window.open(url)
      }
    }
  },
  watch: {
    active: function (newVal) {
      switch (newVal) {
        case 0:
          this.tableData = deepClone(this.defaultData.daka)
          break
        case 1:
          this.tableData = deepClone(this.defaultData.zhubo)
          break
        case 2:
          this.oneLine = this.defaultData.xinxiu.slice(0, 3)
          this.twoLine = this.defaultData.xinxiu.slice(3, 6)
          this.threeLine = this.defaultData.xinxiu.slice(6, 10)
          break
      }
    }
  }
}
</script>

<style scoped>
.container {
  background: url(https://img.alicdn.com/tfs/TB1vSG5Jr2pK1RjSZFsXXaNlXXa-466-2680.png) top #0f0f0f;
  margin: 0;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Microsoft YaHei,Arial,sans-serif;
  color: #fff;
}
.header {
  margin-bottom: 90px;
  background: url(https://txws-athena-prod.oss-cn-hangzhou.aliyuncs.com/common/1555052601547.png) top no-repeat;
  height: 617px;
}
.content {
  width: 1386px;
  margin: 0 auto;
  background: #000;
}
.tab {
  text-align: center;
  position: relative;
}
.tab:after {
    height: 1px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    background: url(https://img.alicdn.com/tfs/TB1cpaNJAvoK1RjSZFDXXXY3pXa-1255-1.jpg) bottom no-repeat;
}
.tab-item {
  display: inline-block;
  background: url(https://img.alicdn.com/tfs/TB1WQuBJzDpK1RjSZFrXXa78VXa-320-100.jpg) no-repeat;
  width: 320px;
  height: 100px;
  font-size: 50px;
  color: #ffdfa5;
  line-height: 100px;
  text-shadow: 0 0 5px rgba(255,255,255,.5);
  cursor: pointer;
  margin: 0 10px;
  text-align: center;
}
.tab-item-active {
  color: #89531a;
  background: url(https://img.alicdn.com/tfs/TB180mLJwHqK1RjSZFgXXa7JXXa-320-100.png) no-repeat;
  text-shadow: 0 0 10px rgba(255,255,255,.5);
}
.table {
  padding: 30px 60px;
  table-layout: fixed;
  background: url(https://img.alicdn.com/tfs/TB1B419JCzqK1RjSZFHXXb3CpXa-1386-103.jpg) repeat-y;
  border-width: 1px;
  position: relative;
}
.table:before {
  content: " ";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0px;
  width: 10px;
  background: url(https://img.alicdn.com/tfs/TB1eaHrJyLaK1RjSZFxXXamPFXa-10-1700.jpg) 0 0/10px 100%;
  z-index: 100;
}
.table:after {
  content: " ";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 10px;
  background: url(https://img.alicdn.com/tfs/TB1eaHrJyLaK1RjSZFxXXamPFXa-10-1700.jpg) 0 0/10px 100%;
  z-index: 100;
  right: 0px;
}
.bg-top {
  background: url(https://img.alicdn.com/tfs/TB1_SC8JrvpK1RjSZFqXXcXUVXa-1386-197.png) top no-repeat;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 197px;
}
.bg-bottom {
  background: url(https://img.alicdn.com/tfs/TB1x8W_JpzqK1RjSZFCXXbbxVXa-1386-129.jpg) bottom no-repeat;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 129px;
}
.colorGold {
  color: #ffdfa5;
}

table {
  width: 100%;
  font-size: 28px;
  position: relative;
  z-index: 100;
}

table th {
  border-bottom: 1px solid #3f3f3f;
  padding: 30px 10px;
  text-align: center;
  font-weight: 400;
}
table th.userAvatar {
  text-align: left;
  padding-left: 90px;
}
table td {
  padding: 10px;
  line-height: 30px;
  text-align: center;
}
table td.userAvatar {
  text-align: left;
  padding-left: 10px;
  width: 440px;
}
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 30px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.content-bottom {
  padding-bottom: 50px;
  text-align: center;
}
.show-text {
  width: 850px;
  margin: 30px auto 0;
  font-size: 20px;
  color: rgba(198,161,91,.769);
  line-height: 1.2;
  text-align: center;
}
.go {
  cursor: pointer;
}
.grey {
  filter: brightness(60%);
  cursor: not-allowed;
}
.top {
  margin-top: 60px;
}

.three-set {
  width: 750px;
  font-size: 28px;
  margin: 40px auto 0;
  z-index: 100;
  align-items: flex-start;
  justify-content: space-between;
  display: flex;
  flex-flow: row wrap;
}
.four {
  width: 1010px;
}
.bottom {
  margin-bottom: 60px;
}
.navs {
  position: relative;
  width: 176px;
  height: 264px;
}
.navs .avatar-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 176px;
  height: 206px;
  overflow: hidden;
}
.navs .avatar-container .avatar {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.hexagon {
  position: absolute;
  top: 0;
  left: 0;
  width: 176px;
  height: 206px;
}
.navs .item {
  position: absolute;
  width: 30px;
  height: 30px;
  top: 180px;
  left: 70px;
}
.navs .item img {
  vertical-align: middle;
  border-style: none;
}
.navs .text {
  position: absolute;
  top: 234px;
  left: 0;
  width: 200%;
  margin-left: -50%;
  height: 30px;
  text-align: center;
  font-size: 28px;
}
</style>
