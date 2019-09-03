/*
 * @Author: liuxia
 * @Date: 2019-08-13 14:52:11
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-08-22 13:58:45
 */

<template>
  <div class="home_container" id="home_container">
    <!-- banner -->
    <banner
      :banners="banners"
      :ranklistCount="ranklistCount"
      :taoHot="taoHot">
    </banner>
    <!-- 最新排行 -->
    <ranking
      :tableData="tableData"
      :list="list"
      :ranklists="ranklists"
      :activities="activities">
    </ranking>
    <!-- 内容电商 -->
    <contents
      :leftData="leftData"
      :rightData="rightData"
    >
    </contents>
    <!-- 广告 -->
    <section class="home__article-img" v-for="(item, i) in adv" :key="i">
      <a :href="item.link">
        <img :src="item.icon" alt="">
      </a>
    </section>
    <!-- 报文 -->
    <articles
      :pageQuerylist="pageQuerylist">
    </articles>
    <!-- link -->
    <links
    :listlinks="listlinks">
    </links>
    <footer>
      <span style="color: #90BEF9">浙江天下网商网络传媒有限公司</span>
      <span>&nbsp;&nbsp;|&nbsp;&nbsp;未经许可不得转载&nbsp;&nbsp;|&nbsp;&nbsp;浙ICP备11003104号-2&nbsp;&nbsp;|&nbsp;&nbsp;互联网出版许可证：新出网证（浙）字39号</span>
    </footer>
  </div>
</template>
<script>
import { homeApi } from '~/api/home.js'
import { sliceArray, deepClone, isEmpty } from '~/utils/tool.js'
import banner from './components/banner.vue'
import ranking from './components/ranking.vue'
import contents from './components/contents.vue'
import articles from './components/article'
import links from './components/links'

export default {
  name: 'home',
  components: {
    banner,
    ranking,
    contents,
    articles,
    links
  },
  data () {
    return {
      ranklists: [], // 排行列表
      ranklistCount: {}, // 榜单统计
      adv: {}, // 广告
      listlinks: [], // 友情链接
      taoHot: [],
      pageQuerylist: [], // 爆文列表
      active: false,
      banners: [],
      tableData: {},
      list: [],
      activities: [],
      leftData: [],
      rightData: []
    }
  },
  async created () {
    // 爆文数据
    const pageList = isEmpty(this.$store.state.home.pageQuerylist)
      ? await this.$store.dispatch('getPageQuery')
      : deepClone(this.$store.state.home.pageQuerylist)

    this.pageQuerylist = sliceArray(pageList.items, 8)

    // 友情链接
    this.listlinks = isEmpty(this.$store.state.home.listlinks)
      ? await this.$store.dispatch('getListlinks')
      : deepClone(this.$store.state.home.listlinks)

    // 广告
    this.adv = isEmpty(this.$store.state.home.adv)
      ? await this.$store.dispatch('getListMainAdv')
      : deepClone(this.$store.state.home.adv)

    // 最新排行
    const articleData = isEmpty(this.$store.state.home.ranklists)
      ? await this.$store.dispatch('getRanklists')
      : deepClone(this.$store.state.home.ranklists)

    // banners
    this.banners = isEmpty(this.$store.state.home.banners)
      ? await this.$store.dispatch('getBanners')
      : deepClone(this.$store.state.home.banners)

    // 主播数据
    const hostObj = isEmpty(this.$store.state.home.hostObj)
      ? await this.$store.dispatch('getHostData', {
        count: articleData[0].latestPublishCount,
        id: articleData[0].listId
      })
      : deepClone(this.$store.state.home.hostObj)

    // 短视频数据
    const videoObj = isEmpty(this.$store.state.home.videoObj)
      ? await this.$store.dispatch('getVideoData', {
        count: articleData[1].latestPublishCount,
        id: articleData[1].listId
      })
      : deepClone(this.$store.state.home.videoObj)

    articleData[0] = {...articleData[0], ...hostObj, type: '主播综合榜'}
    articleData[1] = {...articleData[1], ...videoObj, type: '短视频综合榜'}

    const hostDarens = hostObj.contents.map(item => item['达人信息']).toString()
    const videoDarens = videoObj.contents.map(item => item['达人信息'])
    const hostTableData = await homeApi.getListdareninfo({darens: hostDarens.toString()})
    const videoTableData = await homeApi.getListdareninfo({darens: videoDarens.toString()})

    const taoHotList = await homeApi.getTaoHot()
    const taoHot = sliceArray(taoHotList.data.data, 3)
    const rankList = await homeApi.getRanklistsummation()

    // 榜单解读
    const activities = await homeApi.getCategoryArticles({categoryId: 2, number: 9})
    this.activities = activities.data.data
    // 内容电商
    const leftData = await homeApi.getCategoryArticles({categoryId: 3, number: 6})
    const rightData = await homeApi.getCategoryArticles({categoryId: 1, number: 4})
    this.leftData = leftData.data.data
    this.rightData = rightData.data.data
    this.tableData = {...hostTableData.data.data, ...videoTableData.data.data}
    this.list = [hostObj, videoObj]
    this.ranklists = articleData
    this.taoHot = taoHot
    this.ranklistCount = rankList.data.data
  }
}
</script>

<style lang="scss" scoped>
.home_container{
  overflow: auto;
  footer{
    height: 68px;
    width: 100%;
    text-align: center;
    line-height: 68px;
    font-family: SourceHanSansCN-Medium;
    font-size: 12px;
    color: #9d9e9e;
    background: #3c3e40;
  }
}
</style>
