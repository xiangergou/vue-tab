<template>
  <section class="navi-container">
    <header class="nav">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#FB5E42"
        text-color="#fff"
        active-text-color="#fff">
        <el-menu-item  v-for="(item, i) in navList" :key="i" :index="''+(i+1)" @click="handleSelect(item, ''+(i+1))">
          {{item.name}}
        </el-menu-item>
      </el-menu>
    </header>
    <section class="content">
      <div class="card" v-for="(item, i) in articles" :key="i" @click="toDetial(item.articleId)">
        <div class="img">
          <img :src="item.cover" alt="">
        </div>
        <div class="article">
          <h3>{{item.title}}</h3>
          <h4>{{item.brief}}</h4>
          <i>{{item.keyword1}}
            <strong v-show="item.keyword2">/</strong>
            {{item.keyword2}}
            <strong v-show="item.keyword3">/</strong>
            {{item.keyword3}}
          </i>
          <span>{{item.author}}  {{timeformat(item.publishTime)}}</span>
        </div>
      </div>
    </section>
    <footer>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 30, 40, 50, 60, 70]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="articleCount">
      </el-pagination>
    </footer>
  </section>
</template>
<script>
import { artApi } from '~/api/article.js'
import { timestampToTime } from '~/utils/tool'

export default {
  components: {
  },
  async created () {
    // console.log(await listApi.getAreas(), 'await listApi.getBanners()')
    // const bannerList = await listApi.getBanners();

  },
  data () {
    return {
      articles: '',
      navList: [],
      activeIndex: '1',
      articleCount: 0,
      currentTab: null
    }
  },
  methods: {
    async handleSizeChange (val) {
      const articleList = await artApi.getPageQuery({categoryId: this.currentTab, pageSize: val})
      this.articles = articleList.data.data.items
    },
    async handleCurrentChange (val) {
      const articleList = await artApi.getPageQuery({categoryId: this.currentTab, page: val})
      this.articles = articleList.data.data.items
    },
    async handleSelect (item, i) {
      this.activeIndex = i
      this.currentTab = item.categoryId

      const articleList = await artApi.getPageQuery({categoryId: this.currentTab})
      this.articles = articleList.data.data.items
    },
    toDetial (id) {
      this.$router.push({
        path: '/navi/article',
        query: {
          id
        }
      })
    },
    timeformat (time) {
      return timestampToTime(time)
    }
  },
  async mounted () {
    const nav = await artApi.getCategory()
    const categoryId = nav.data.data[0].categoryId
    const articleList = await artApi.getPageQuery({categoryId})
    this.navList = nav.data.data
    const type = this.$route.query.type
    if (type) {
      this.categoryId = this.activeIndex = type + ''
      const articleList = await artApi.getPageQuery({categoryId: this.categoryId})
      this.articles = articleList.data.data.items
      this.articleCount = articleList.data.data.count
    } else {
      this.currentTab = this.navList[0].categoryId
      this.articles = articleList.data.data.items
      this.articleCount = articleList.data.data.count
    }
  }
}
</script>

<style lang="scss">
.navi-container{
  background: #f7f7f7;
  .nav{
    width: 100%;
    background: #FB5E42;
    .el-menu{
      width: 1180px;
      margin: 0 auto;
      height: 46px;
      .el-menu-item{
        height: 46px;
        line-height: 46px;
        border-width: 3px;
        font-weight: bold;
      }
    }
  }
  .content{
    max-width: 1180px;
    margin: 20px auto;
    background: #fff;
    padding: 0 25px;
    box-sizing: border-box;
    .card{
      padding: 25px 0;
      box-sizing: border-box;
      cursor: pointer;
      color: #d9d9d9;
      display: flex;
      background: #fff;
      border-top: 1px solid #d6d6d6;
      .img{
        vertical-align: top;
        width: 250px;
        height: 140px;
        background: #ff8b77;
        overflow: hidden;
        img{
          width:100%;
          height: 100%;;
        }
      }
      .article{
        flex: 1;
        vertical-align: top;
        padding-left: 25px;
        box-sizing: border-box;
        h3{
          height: 27px;
          font-family: SourceHanSansCN-Medium;
          font-size: 18px;
          color: #333;
          letter-spacing: 0;
        }
        h4{
          margin-top: 5px;
          height: 42px;
          font-family: SourceHanSansCN-Regular;
          font-size: 14px;
          color: #999;
          letter-spacing: 0;
          line-height: 21px;
          overflow: hidden;
        }
        i{
          display: block;
          margin-top: 7px;
          height: 20px;
          line-height: 20px;
          font-family: SourceHanSansCN-Regular;
          font-size: 14px;
          color: #666;
        }
        span{
          display: inline-block;
          margin-top: 22px;
          font-family: SourceHanSansCN-Normal;
          font-size: 14px;
          color: #666;
          letter-spacing: 0;
        }
      }
    }
    .card:first-child{
      border: none;
    }
  }
  footer{
    width: 1180px;
    margin: 0 auto;
    padding: 30px 0;
    // margin: 30px auto;
    text-align: center;
  }
}
.el-radio__label{
  margin-bottom: 10px !important;
}
</style>
