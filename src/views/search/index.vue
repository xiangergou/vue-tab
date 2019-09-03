<template>
  <div class="navi-container">
    <section class="content" v-if="hasArticle">
      <header>
        已为您找到有关“{{$route.query.keyword}}”关键词的内容
      </header>

      <div class="card" v-for="(item, i) in articles" :key="i" @click="toDetial(item.articleId)">
        <div class="img">
          <img :src="item.cover" alt="">
        </div>
        <div class="article">
          <h3>{{item.title}}</h3>
          <h4>{{item.brief}}</h4>
          <i>
            <img src="@/assets/images/tag.svg" alt="" style="vertical-align: middle;">
            {{item.keyword1}}
            <strong v-show="item.keyword2">/</strong>
            {{item.keyword2}}
            <strong v-show="item.keyword3">/</strong>
            {{item.keyword3}}
          </i>
          <span>{{item.author}}  {{timeformat(item.publishTime)}}</span>
        </div>
      </div>
    </section>
    <section class="content" v-else>
      <el-card class="no-article">
        <img src="@/assets/images/empty-data.png">
        <p>没有找到与“{{$route.query.keyword}}”相关的文章</p>
      </el-card>
    </section>
    <footer  v-if="hasArticle">
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
  </div>
</template>

<script>
import { artApi } from '~/api/article'
import { timestampToTime } from '~/utils/tool'

export default {
  name: 'search',
  data () {
    return {
      hasArticle: false,
      articles: [],
      articleCount: 0
    }
  },
  methods: {
    toDetial (id) {
      this.$router.push({
        path: '/navi/article',
        query: {
          id
        }
      })
    },
    handleSizeChange (val) {
      this.getData({pageSize: val})
    },
    handleCurrentChange (val) {
      this.getData({page: val})
    },
    getData (obj = {page: 1, pageSize: 15}) {
      const param = {
        page: obj.page,
        pageSize: obj.pageSize,
        keyword: this.$route.query.keyword
      }
      artApi.getSearch(param).then(res => {
        const data = res.data.data
        this.hasArticle = +data.count > 0
        this.articleCount = +data.count
        this.articles = data.items
      })
    },
    timeformat (time) {
      return timestampToTime(time)
    }
  },
  created () {
    this.getData()
  },
  watch: {
    $route (newValue, oldValue) {
      this.getData()
    }
  }
}
</script>

<style lang="scss">
.navi-container{
  background: #f7f7f7;
  width: 100%;
  min-height: calc(100vh - 100px);
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
      }
    }
  }
  .content{
    header{
      height: 56px;
      margin-top: 25px;
      margin-bottom: 20px;
      line-height: 56px;
      padding: 0 20px;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #3c3c3c;
      background: #fff;
    }
    max-width: 1180px;
    margin: 20px auto;
    padding: 0 25px;
    box-sizing: border-box;
    .card{
      background: #fff;
      padding: 25px;
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
    .card:nth-child(2){
      border: none;
    }
  }
  footer{
    width: 1180px;
    margin: 0 auto;
    padding: 30px 0;
    text-align: center;
  }
  .no-article{
    text-align: center;
    height: 300px;;
    display: flex;
    justify-content: center;
    align-items: center;
    p{
      margin-left: 10px;
      float: right;
      margin-top: 30px;
    }
  }
}
</style>
