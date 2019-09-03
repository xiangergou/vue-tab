<template>
  <div class="article-container">
    <section class="content">
      <h3>{{article.title}}</h3>
      <div class="subtitle">
        <span>{{article.author}}</span>
        <span style="float: right">{{article.keyword1}}
          <i v-show="article.keyword2">/</i>
          {{article.keyword2}}
          <i v-show="article.keyword3">/</i>
          {{article.keyword3}}
        </span>
      </div>
      <div class="content-datail">
         <div v-html="article.content" class="content-detail__body">
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { artApi } from '~/api/article.js'
export default {
  name: 'articleDetail',
  async created () {
    const detail = await artApi.getDetail({ articleId: this.$route.query.id })
    this.article = detail.data.data
  },
  data () {
    return {
      article: {}
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="scss">
.article-container{
  background: #ffffff;
  .content{
    width: 650px;
    margin: 0 auto;
    padding: 53px 0 100px;
    box-sizing: border-box;
    h3{
      font-family: SourceHanSansCN-Normal;
      font-size: 24px;
      color: #333;
      letter-spacing: 0;
      line-height: 36px;
      text-align: center;
    }
    img{
      width: 100%;
    }
    .subtitle{
      margin-top: 5px;
      height: 38px;
      line-height: 38px;
      font-family: SourceHanSansCN-Normal;
      font-size: 12px;
      color: #666;
      letter-spacing: 0;
      border-bottom: 1px solid #d6d6d6;
    }
    .content-datail{
      width: 100%;
      padding: 20px 0;
    }
    .content-detail__body{
      font-family: SourceHanSansCN-Normal;
      font-size: 14px;
      color: #333;
      letter-spacing: 0;
      line-height: 28px;
      img{
        width: 100% !important;
        height: auto !important;
      }
    }
  }
}
</style>
