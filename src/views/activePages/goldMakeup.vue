<template>
  <div class="container">
    <div class="header"></div>
    <div class="content">
      <ul class="tab">
        <li class="tab-item" @click="active = 0" :class="{'tab-item-active': active == 0}">明星榜</li>
        <li class="tab-item" @click="active = 1" :class="{'tab-item-active': active == 1}">媒体榜</li>
        <li class="tab-item" @click="active = 2" :class="{'tab-item-active': active == 2}">红人榜</li>
      </ul>
      <div class="table">
        <div class="bg-top"></div>
        <div class="bg-bottom"></div>
        <table cellpadding="0" cellspacing="0" v-show="active != 0">
          <thead>
            <th width="20"></th>
            <th class="colorGold userAvatar">红人</th>
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
              <td>{{ item.fans }}</td>
              <td>{{ item.content }}</td>
              <td>{{ item.trade }}</td>
              <td class="colorGold">
                <img src="https://img.alicdn.com/tfs/TB1hsnaJpYqK1RjSZLeXXbXppXa-27-23.png">
                {{ item.tao }}
              </td>
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
        <div v-show="active == 0">
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
          <div class="three-set four">
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
          <div class="three-set bottom">
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
      <div class="qr-container">
        <img class="qrcode" :src="gzh">
      </div>
      <div class="more-message">更多信息扫码关注淘榜单</div>
    </div>
  </div>
</template>

<script>
import { deepClone } from '~/utils/tool'
const goldArrow = require('~/assets/images/gold-arrow.png')
const hexagon = require('~/assets/images/hexagon.png')
const gzh = require('~/assets/images/gzh.png')
export default {
  name: 'jingzhuang',
  data () {
    return {
      active: 0,
      goldArrow,
      hexagon,
      gzh,
      defaultData: {
        'star': [
          {
            'ID': '3537203015',
            'name': '艾克里里',
            'fans': '806 ',
            'content': '579 ',
            'trade': '151 ',
            'tao': '476',
            'url': 'https://img.alicdn.com/imgextra/i2/3537203015/TB2lX0HdER1BeNjy0FmXXb0wVXa_!!3537203015-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.772f4accLYtbTU&userId=3537203015'
          },
          {
            'name': '程晓玥',
            'fans': '739 ',
            'content': '529 ',
            'trade': '280 ',
            'tao': '492',
            'url': 'https://gw.alicdn.com/imgextra/i3/922847854/TB2WFXonQ9WBuNjSspeXXaz5VXa_!!922847854-0-beehive-scenes.jpg',
            'cooperate': 'https://market.m.taobao.com/apps/abs/9/41/index?ut_sk=1.W/eDwSvMrdQDADxP1442P7t%2B_21380790_1551116655261.DingTalk.4&wh_weex=true&pageId=6273&suid=E4D8F3E6-A8B3-44BC-8A00-C065E25F5C46&tabString=feeds&spm=a211i5.10638400&utparam=%7B%22ranger_buckets%22%3A%223243%22%7D&user_id=922847854&wx_navbar_transparent=true&sourceType=other&wx_navbar_hidden=true&disableAB=true&un=e621bee74ac6438e4c6e4bed9157ce66&share_crt_v=1&cpp=1&shareurl=true&short_name=h.3Eo9hui&app=chrome'
          },
          {
            'name': '高露',
            'fans': '706 ',
            'content': '599 ',
            'trade': '384 ',
            'tao': '545',
            'url': 'https://gw.alicdn.com/imgextra/i3/3867796871/O1CN01yYsnBJ20cxrYA5MzE_!!3867796871-0-beehive-scenes.jpg',
            'cooperate': 'https://market.m.taobao.com/apps/abs/9/41/index?ut_sk=1.W/eDwSvMrdQDADxP1442P7t%2B_21380790_1551148475068.DingTalk.4&wh_weex=true&pageId=6273&suid=42099499-7DEF-442F-83AC-9BAFC308CB22&tabString=feeds&spm=a211i5.10638400&utparam=%7B%22ranger_buckets%22%3A%223243%22%7D&user_id=3867796871&wx_navbar_transparent=true&sourceType=other&wx_navbar_hidden=true&disableAB=true&un=e621bee74ac6438e4c6e4bed9157ce66&share_crt_v=1&cpp=1&shareurl=true&short_name=h.3EK2ROw&app=chrome'
          },
          {
            'name': '林允',
            'fans': '944 ',
            'content': '754 ',
            'trade': '686 ',
            'tao': '784',
            'url': 'http://img.alicdn.com/imgextra/i3/3876046083/O1CN011uo3jgIHdCb7n72_!!3876046083-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.48b94accMm930L&userId=3876046083'
          },
          {
            'name': 'papi酱',
            'fans': '1,000 ',
            'content': '849 ',
            'trade': '257 ',
            'tao': '657',
            'url': 'https://gw.alicdn.com/imgextra/i4/3710239442/TB2hjGGX_JYBeNjy1zeXXahzVXa_!!3710239442-0-beehive-scenes.jpg',
            'cooperate': 'https://market.m.taobao.com/apps/abs/9/41/index?ut_sk=1.W/eDwSvMrdQDADxP1442P7t%2B_21380790_1551116655261.DingTalk.4&wh_weex=true&pageId=6273&suid=0C2B746C-3386-4E07-9CF2-D84C45821A0E&tabString=feeds&spm=a211i5.10638400&utparam=%7B%22ranger_buckets%22%3A%223243%22%7D&user_id=3710239442&wx_navbar_transparent=true&sourceType=other&wx_navbar_hidden=true&disableAB=true&un=e621bee74ac6438e4c6e4bed9157ce66&share_crt_v=1&cpp=1&shareurl=true&short_name=h.3wYLryl&app=chrome'
          },
          {
            'name': '戚薇',
            'fans': '997 ',
            'content': '736 ',
            'trade': '580 ',
            'tao': '752',
            'url': 'https://img.alicdn.com/imgextra/i3/3927710134/TB25Q5ppKuSBuNjy1XcXXcYjFXa_!!3927710134-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.6f6a4accogJX9g&userId=3927710134'
          },
          {
            'name': '秦岚',
            'fans': '861 ',
            'content': '720 ',
            'trade': '429 ',
            'tao': '646',
            'url': 'https://gw.alicdn.com/imgextra/i1/4085868413/TB29vTBosIrBKNjSZK9XXagoVXa_!!4085868413-0-beehive-scenes.jpg',
            'cooperate': 'https://market.m.taobao.com/apps/abs/9/41/index?ut_sk=1.W/eDwSvMrdQDADxP1442P7t%2B_21380790_1551116655261.DingTalk.4&wh_weex=true&pageId=6273&suid=CFBA9547-59FE-4062-923E-FB2E5C393C30&tabString=feeds&spm=a211i5.10638400&utparam=%7B%22ranger_buckets%22%3A%223243%22%7D&user_id=4085868413&wx_navbar_transparent=true&sourceType=other&wx_navbar_hidden=true&disableAB=true&un=e621bee74ac6438e4c6e4bed9157ce66&share_crt_v=1&cpp=1&shareurl=true&short_name=h.3EuoQ2e&app=chrome'
          },
          {
            'name': '吴昕',
            'fans': '981 ',
            'content': '770 ',
            'trade': '519 ',
            'tao': '733',
            'url': 'https://gw.alicdn.com/imgextra/i4/3992421976/TB2toQXzmtYBeNjSspaXXaOOFXa_!!3992421976-0-beehive-scenes.jpg',
            'cooperate': 'https://market.m.taobao.com/apps/abs/9/41/index?ut_sk=1.W/eDwSvMrdQDADxP1442P7t%2B_21380790_1551116655261.DingTalk.4&wh_weex=true&pageId=6273&suid=412DBCC9-0567-4E84-A4D8-CEBC575778B6&tabString=feeds&spm=a211i5.10638400&utparam=%7B%22ranger_buckets%22%3A%223243%22%7D&user_id=3992421976&wx_navbar_transparent=true&sourceType=other&wx_navbar_hidden=true&disableAB=true&un=e621bee74ac6438e4c6e4bed9157ce66&share_crt_v=1&cpp=1&shareurl=true&short_name=h.3wYoDaZ&app=chrome'
          },
          {
            'name': '张雨绮',
            'fans': '820 ',
            'content': '654 ',
            'trade': '470 ',
            'tao': '630',
            'url': 'https://gw.alicdn.com/imgextra/i2/4148040613/TB2.ixKXRLoK1RjSZFuXXXn0XXa_!!4148040613-0-beehive-scenes.jpg',
            'cooperate': 'https://market.m.taobao.com/apps/abs/9/41/index?ut_sk=1.W/eDwSvMrdQDADxP1442P7t%2B_21380790_1551116655261.DingTalk.4&wh_weex=true&pageId=6273&suid=5AE77E86-A8D0-48BD-B93B-F35ACDB9AF7C&tabString=feeds&spm=a211i5.10638400&utparam=%7B%22ranger_buckets%22%3A%223243%22%7D&user_id=4148040613&wx_navbar_transparent=true&sourceType=other&wx_navbar_hidden=true&disableAB=true&un=e621bee74ac6438e4c6e4bed9157ce66&share_crt_v=1&cpp=1&shareurl=true&short_name=h.3Eo9hCQ&app=chrome'
          },
          {
            'name': '张俪',
            'fans': '846 ',
            'content': '639 ',
            'trade': '443 ',
            'tao': '622',
            'url': 'https://gw.alicdn.com/imgextra/i3/2207259995/O1CN012Nhl8wH9fqQhMq3_!!2207259995-2-beehive-scenes.png',
            'cooperate': 'https://market.m.taobao.com/apps/abs/9/41/index?ut_sk=1.W/eDwSvMrdQDADxP1442P7t%2B_21380790_1551116655261.DingTalk.4&wh_weex=true&pageId=6273&suid=660DDCFD-BB56-4F84-9530-420E06E3BFF8&tabString=feeds&spm=a211i5.10638400&utparam=%7B%22ranger_buckets%22%3A%223243%22%7D&user_id=2207259995&wx_navbar_transparent=true&sourceType=other&wx_navbar_hidden=true&disableAB=true&un=e621bee74ac6438e4c6e4bed9157ce66&share_crt_v=1&cpp=1&shareurl=true&short_name=h.3EupV0e&app=chrome'
          }
        ],
        'medium': [
          {
            'ID': '3382932207',
            'url': 'https://img.alicdn.com/imgextra/i3/3382932207/TB2bXyEzyOYBuNjSsD4XXbSkFXa_!!3382932207-0-beehive-scenes.jpg ',
            'name': 'SuperELLE',
            'fans': '734 ',
            'content': '674 ',
            'trade': '633 ',
            'tao': '676',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.17e44accUGd3SO&userId=3382932207'
          },
          {
            'ID': '2928881251',
            'url': 'https://img.alicdn.com/imgextra/i1/2928881251/TB2_.NygR0kpuFjSsppXXcGTXXa_!!2928881251-0-beehive-scenes.jpg ',
            'name': 'YOKA时尚网',
            'fans': '798 ',
            'content': '630 ',
            'trade': '608 ',
            'tao': '672',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.5e284accs8r8pu&userId=2928881251'
          },
          {
            'ID': '2660672139',
            'url': 'https://img.alicdn.com/imgextra/i1/2233054360/TB2.6AKarMlyKJjSZFAXXbkLXXa_!!2233054360-0-beehive-scenes.jpg ',
            'name': 'OnlyLady_女人志',
            'fans': '635 ',
            'content': '689 ',
            'trade': '625 ',
            'tao': '647',
            'cooperate': 'https://market.m.taobao.com/apps/abs/9/41/index?ut_sk=1.W/eDwSvMrdQDADxP1442P7t%2B_21380790_1551116655261.DingTalk.4&wh_weex=true&pageId=6273&suid=35CAF939-75AC-488C-BFB1-B05809AE60F6&tabString=feeds&spm=a211i5.10638400&utparam=%7B%22ranger_buckets%22%3A%223243%22%7D&user_id=2660672139&wx_navbar_transparent=true&sourceType=other&wx_navbar_hidden=true&disableAB=true&un=e621bee74ac6438e4c6e4bed9157ce66&share_crt_v=1&cpp=1&shareurl=true&short_name=h.3EoOgdY&app=chrome'
          },
          {
            'ID': '1900328854',
            'url': 'https://img.alicdn.com/imgextra/i2/1900328854/TB20fekyypnpuFjSZFkXXc4ZpXa_!!1900328854-0-beehive-scenes.jpg ',
            'name': 'InStyle优家画报',
            'fans': '754 ',
            'content': '585 ',
            'trade': '575 ',
            'tao': '632',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.5a444acccBZeA8&userId=1900328854'
          },
          {
            'ID': '2473175315',
            'url': 'https://img.alicdn.com/imgextra/i2/2473175315/TB2453Uba6qK1RjSZFmXXX0PFXa_!!2473175315-0-beehive-scenes.jpg',
            'name': '时尚cosmo',
            'fans': '802 ',
            'content': '694 ',
            'trade': '362 ',
            'tao': '594',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.14404acc7tCRpp&userId=2473175315'
          },
          {
            'ID': '2504074605',
            'url': 'https://img.alicdn.com/imgextra/i4/2504074605/TB2Ro4UpDdYBeNkSmLyXXXfnVXa_!!2504074605-0-beehive-scenes.jpg ',
            'name': '海报时尚网',
            'fans': '631 ',
            'content': '634 ',
            'trade': '520 ',
            'tao': '587',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.7f124acctgCaOE&userId=2504074605'
          },
          {
            'ID': '3001905042',
            'url': 'https://img.alicdn.com/imgextra/i4/3001905042/TB200T3maAoBKNjSZSyXXaHAVXa_!!3001905042-2-beehive-scenes.png ',
            'name': '时尚芭莎_BAZAAR',
            'fans': '507 ',
            'content': '566 ',
            'trade': '603 ',
            'tao': '563',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.61654accuUDKZt&userId=3001905042'
          },
          {
            'ID': '3565110962',
            'url': 'https://img.alicdn.com/imgextra/i2/3565110962/TB2E8htab1YBuNjSszeXXablFXa_!!3565110962-0-beehive-scenes.jpg ',
            'name': 'VOGUE服饰与美容',
            'fans': '785 ',
            'content': '610 ',
            'trade': '309 ',
            'tao': '542',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.5ae94accpp3lzj&userId=3565110962'
          },
          {
            'ID': '3384732284',
            'url': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.7c3a4accMRl6kh&userId=3384732284',
            'name': '嘉人marie claire',
            'fans': '702 ',
            'content': '598 ',
            'trade': '327 ',
            'tao': '521',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.7c3a4accMRl6kh&userId=3384732284'
          },
          {
            'ID': '2892095529',
            'url': 'https://img.alicdn.com/imgextra/i2/2892095529/TB2zAeBAx9YBuNjy0FfXXXIsVXa_!!2892095529-0-beehive-scenes.jpg',
            'name': 'if时尚',
            'fans': '483 ',
            'content': '501 ',
            'trade': '528 ',
            'tao': '506',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.1e794acccguKuf&userId=2892095529'
          },
          {
            'ID': '2676744352',
            'url': 'https://img.alicdn.com/imgextra/i4/2676744352/TB2mmtoamZb61BjSZFNXXbHCpXa_!!2676744352-2-beehive-scenes.png ',
            'name': '闺蜜美妆kimiss',
            'fans': '291 ',
            'content': '423 ',
            'trade': '465 ',
            'tao': '400',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.802.1.79c34accX5s87R&userId=2676744352'
          },
          {
            'ID': '3828110306',
            'url': 'https://img.alicdn.com/imgextra/i4/3828110306/TB2zZ7WXLiSBuNkSnhJXXbDcpXa_!!3828110306-0-beehive-scenes.jpg',
            'name': 'cosme美妆大赏',
            'fans': '529 ',
            'content': '263 ',
            'trade': '188 ',
            'tao': '313',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.ae5b4acc1Yq4jU&userId=3828110306'
          }
        ],
        'hot': [
          {
            'ID': '1759494485',
            'ID_1': '1759494485',
            'name': '李佳琦',
            'fans': '851 ',
            'content': '1,000 ',
            'trade': '1,000 ',
            'tao': '955',
            'url': 'https://img.alicdn.com/imgextra/i3/1759494485/TB2LHa4olmWBuNkSndVXXcsApXa_!!1759494485-2-beehive-scenes.png',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.3cd74accFkWB4P&userId=1759494485'
          },
          {
            'ID': '2103587316',
            'ID_1': '2103587316',
            'name': '张大奕eve',
            'fans': '881 ',
            'content': '802 ',
            'trade': '882 ',
            'tao': '858',
            'url': 'https://img.alicdn.com/imgextra/i1/2103587316/O1CN01ug9RuA23um6Gn2GYh_!!2103587316-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.51534accSGZQA4&userId=2103587316'
          },
          {
            'ID_1': '842873055',
            'name': '认真少女-颜九',
            'fans': '824 ',
            'content': '856 ',
            'trade': '583 ',
            'tao': '737',
            'url': 'https://img.alicdn.com/imgextra/i3/842873055/TB2w7EkinJYBeNjy1zeXXahzVXa_!!842873055-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.36a44accIpU2Of&userId=842873055'
          },
          {
            'ID': '3002703631',
            'ID_1': '3002703631',
            'name': '张凯毅KEVIN',
            'fans': '824 ',
            'content': '768 ',
            'trade': '462 ',
            'tao': '662',
            'url': 'https://img.alicdn.com/imgextra/i2/3002703631/TB2GzgtsH1YBuNjSszhXXcUsFXa_!!3002703631-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.75d74accdltgsS&userId=3002703631'
          },
          {
            'ID': '842873055',
            'ID_1': '497116795',
            'name': '道上都叫我赤木刚宪',
            'fans': '774 ',
            'content': '746 ',
            'trade': '509 ',
            'tao': '659',
            'url': 'https://img.alicdn.com/imgextra/i2/497116795/TB2R.ioiaSWBuNjSsrbXXa0mVXa_!!497116795-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.6f114accvpwA5Y&userId=497116795'
          },
          {
            'ID': '86461435',
            'ID_1': '86461435',
            'name': '曹米娅miya',
            'fans': '555 ',
            'content': '632 ',
            'trade': '746 ',
            'tao': '655',
            'url': 'https://img.alicdn.com/imgextra/i3/86461435/TB2XWfPbY1J.eBjSszcXXbFzVXa_!!86461435-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.36014accrxcm0S&userId=86461435'
          },
          {
            'ID': '2731242600',
            'ID_1': '20994568',
            'name': '俊平大魔王',
            'fans': '806 ',
            'content': '593 ',
            'trade': '448 ',
            'tao': '599',
            'url': 'https://gw3.alicdn.com/tfscom/tuitui/TB1dCXLKVXXXXbXXXXXXXXXXXXX',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.2e564accTcgqB9&userId=20994568'
          },
          {
            'name': '多余和毛毛姐',
            'fans': '911 ',
            'content': '870 ',
            'trade': '153 ',
            'tao': '595',
            'url': 'https://gw.alicdn.com/imgextra/i4/2200615182002/O1CN013LbPzy1QexPgR2D0T_!!2200615182002-0-beehive-scenes.jpg_140x10000Q75.jpg',
            'cooperate': 'https://market.m.taobao.com/apps/abs/9/41/index?ut_sk=1.W/eDwSvMrdQDADxP1442P7t%2B_21380790_1551148475068.DingTalk.4&wx_navbar_hidden=true&spm=a211i5.10638400&share_crt_v=1&wh_weex=true&cpp=1&pageId=6273&disableAB=true&tabString=feeds&suid=370A06C0-F8BE-42D2-9F93-78922224B0AE&user_id=2200615182002&sourceType=other&short_name=h.3EuqVJp&utparam=%7B%22ranger_buckets%22%3A%223243%22%7D&un=e621bee74ac6438e4c6e4bed9157ce66&app=ali_ding&shareurl=true&wx_navbar_transparent=true&cpp=1&shareurl=true&app=chrome'
          },
          {
            'ID': '23706590',
            'ID_1': '3012075984',
            'name': '扇子NFNF',
            'fans': '621 ',
            'content': '608 ',
            'trade': '536 ',
            'tao': '583',
            'url': 'http://gw2.alicdn.com/tfscom/tuitui/TB17eDvNVXXXXaTXVXXXXXXXXXX',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.38064accv043C5&userId=3012075984'
          },
          {
            'ID': '497116795',
            'ID_1': '3001435345',
            'name': 'benny董子初',
            'fans': '696 ',
            'content': '624 ',
            'trade': '421 ',
            'tao': '565',
            'url': 'https://img.alicdn.com/imgextra/i3/3001435345/O1CN01dlDKxR1pM3S5H64P5_!!3001435345-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.3a264accpheha8&userId=3001435345'
          },
          {
            'ID_1': '64733',
            'name': '小猪姐姐',
            'fans': '710 ',
            'content': '530 ',
            'trade': '467 ',
            'tao': '559',
            'url': 'https://img.alicdn.com/imgextra/i3/3052813008/TB2UzXFbZtnpuFjSZFKXXalFFXa_!!3052813008-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.657e4accHms7J0&userId=3052813008'
          },
          {
            'ID_1': '2731242600',
            'name': 'qiuqiu_仇仇',
            'fans': '715 ',
            'content': '577 ',
            'trade': '422 ',
            'tao': '557',
            'url': 'https://img.alicdn.com/imgextra/i2/2731242600/TB2LPuhyQKWBuNjy1zjXXcOypXa_!!2731242600-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.a7284accZlDkd1&userId=2731242600'
          },
          {
            'name': '深夜徐老师',
            'fans': '788 ',
            'content': '664 ',
            'trade': '247 ',
            'tao': '534',
            'url': 'https://gw.alicdn.com/tfscom/tuitui/TB1nrsULVXXXXXaXFXXXXXXXXXX_140x10000Q75.jpg',
            'cooperate': 'https://market.m.taobao.com/apps/abs/9/41/index?ut_sk=1.W/eDwSvMrdQDADxP1442P7t%2B_21380790_1551116655261.DingTalk.4&wh_weex=true&pageId=6273&suid=43C60279-825A-4596-912D-FF891CB8A8B8&tabString=feeds&spm=a211i5.10638400&utparam=%7B%22ranger_buckets%22%3A%223243%22%7D&user_id=465358325&wx_navbar_transparent=true&sourceType=other&wx_navbar_hidden=true&disableAB=true&un=e621bee74ac6438e4c6e4bed9157ce66&share_crt_v=1&cpp=1&shareurl=true&short_name=h.3ETlLJ5&app=chrome'
          },
          {
            'ID': '3001435345',
            'name': '大佬甜er',
            'fans': '714 ',
            'content': '556 ',
            'trade': '369 ',
            'tao': '529',
            'url': 'https://img.alicdn.com/tfs/TB1IyrwJxjaK1RjSZKzXXXVwXXa-180-180.jpg',
            'cooperate': 'https://shop311084632.m.taobao.com/?ut_sk=1.W/eDwSvMrdQDADxP1442P7t%2B_21380790_1551515874777.DingTalk.shop&weexShopSubTab=dongtai&sourceType=shop&weexShopTab=dongtaibar&suid=C437CA13-41E9-4D09-8878-48E8689BF8F2&un=e621bee74ac6438e4c6e4bed9157ce66&share_crt_v=1&cpp=1&shareurl=true&spm=a313p.22.2me.1013619161993&short_name=h.3wtIfUs&app=chrome'
          },
          {
            'ID': '112332458',
            'ID_1': '112332458',
            'name': '黎贝卡的异想世界',
            'fans': '711 ',
            'content': '463 ',
            'trade': '401 ',
            'tao': '513',
            'url': 'https://img.alicdn.com/imgextra/i2/112332458/O1CN01uTOoBt1U1o1bwPW3E_!!112332458-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.62244acclWTS30&userId=112332458'
          },
          {
            'ID_1': '2949230830',
            'name': '西门大嫂',
            'fans': '541 ',
            'content': '503 ',
            'trade': '451 ',
            'tao': '494',
            'url': 'https://img.alicdn.com/imgextra/i4/2949230830/TB2JPY1g0cnBKNjSZR0XXcFqFXa_!!2949230830-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.10534accAVMT2Z&userId=2949230830'
          },
          {
            'ID_1': '88266632',
            'name': 'IAMINRED口红控',
            'fans': '445 ',
            'content': '423 ',
            'trade': '466 ',
            'tao': '447',
            'url': 'https://img.alicdn.com/imgextra/i4/88266632/TB28Rmkbw685uJjSZFCXXXzlXXa_!!88266632-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.296e4accCJ6ioK&userId=88266632'
          },
          {
            'ID': '3482453316',
            'ID_1': '3238815018',
            'name': '李奇潭本人',
            'fans': '593 ',
            'content': '412 ',
            'trade': '261 ',
            'tao': '406',
            'url': 'https://img.alicdn.com/imgextra/i2/3238815018/TB2m5Bnr29TBuNjy0FcXXbeiFXa_!!3238815018-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.7e794acc0bWtC4&userId=3238815018'
          },
          {
            'ID': '88266632',
            'ID_1': '3482453316',
            'name': '帅你一脸的毛蛋',
            'fans': '455 ',
            'content': '407 ',
            'trade': '347 ',
            'tao': '397',
            'url': 'https://img.alicdn.com/imgextra/i2/3482453316/TB2EYciXHYI8KJjy0FaXXbAiVXa_!!3482453316-2-beehive-scenes.png',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.44644accakkyXC&userId=3482453316'
          },
          {
            'name': '就是好厉害holyhigh',
            'fans': '482 ',
            'content': '335 ',
            'trade': '348 ',
            'tao': '384',
            'url': 'https://gw.alicdn.com/imgextra/i3/3874886832/TB21q7Cw_mWBKNjSZFBXXXxUFXa_!!3874886832-0-beehive-scenes.jpg',
            'cooperate': 'https://v.taobao.com/v/home/?spm=a21xh.8861523.801.1.7a854acc3nmsmI&userId=3874886832'
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
    this.oneLine = this.defaultData.star.slice(0, 3)
    this.twoLine = this.defaultData.star.slice(3, 7)
    this.threeLine = this.defaultData.star.slice(7, 10)
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
          this.oneLine = this.defaultData.star.slice(0, 3)
          this.twoLine = this.defaultData.star.slice(3, 7)
          this.threeLine = this.defaultData.star.slice(7, 10)
          break
        case 1:
          this.tableData = deepClone(this.defaultData.medium)
          break
        case 2:
          this.tableData = deepClone(this.defaultData.hot)
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
  background: url(https://img.alicdn.com/tfs/TB1W09hcnZmx1VjSZFGXXax2XXa-1920-617.png) top no-repeat;
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
  background: #000;
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
.qr-container {
  margin: 30px auto 0;
  width: 120px;
  height: 120px;
  text-align: center;
  padding: 5px;
  border-radius: 5px;
  background: #fff;
}
.qr-container .qrcode{
  width: 110px;
  height: 110px;
}
.more-message {
  margin-top: 10px;
  font-size: 20px;
  color: #e6e6e6;
  line-height: 1.2;
  text-align: center;
}
</style>
