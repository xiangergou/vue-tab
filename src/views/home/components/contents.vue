<template>
 <section  class="home__article-content">
      <el-row justify="space-between" type="flex">
        <el-col :span="17" style="margin-right:20px;">
          <div class="ranking_title">
            <h2>内容电商</h2>
            <router-link :to="{path: '/information', query: {type: 1}}">
              <span>更多 ></span></router-link>
          </div>
          <el-card :body-style="{ height: '420px' }">
            <el-row style="margin-bottom: 20px;" class="article-content__left">
              <el-col :span="10">
                <div class="content-img" style="margin-bottom:20px;"
                  v-for="(item, i) in leftData.slice(0, 2)" :key="i"
                  @click="toDetial(item.articleId)">
                  <img v-lazy="item && item.cover" class="image">
                  <span>{{item.title}}</span>
                </div>
              </el-col>
              <el-col :span="14" class="article-content-left__section">
                <div class="setion-body" v-for="(item, i) in leftData.slice(2, 6)" :key="i" @click="toDetial(item.articleId)">
                  <p>{{item.title}}</p>
                  <span class="subtitle">{{item.brief}}</span>
                  <el-row class="section-tags">
                    <el-col :span="6"> {{item.keyword1}}/{{item.keyword2}}</el-col>
                    <el-col :span="18"> {{item.author}}  {{timeformat(item.publishTime)}}</el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="7">
          <div class="ranking_title">
              <h2>资讯</h2>
              <router-link :to="{path: '/information', query: {type: 2}}">
              <span>更多 ></span></router-link>
            </div>
          <el-card :body-style="{ padding: '0px', height: '420px'  }">
            <div class="content-img">
              <img :src="rightData[0] && rightData[0].cover" class="image">
              <span>{{rightData[0] && rightData[0].title}}</span>
            </div>
            <div class="content-article" v-for="(item, i) in rightData.slice(1, 4)" :key="i"
            @click="toDetial(item.articleId)">
              <h3 style="margin-bottom:6px;">{{item.title}}</h3>
              <span>{{item.author}}  {{timeformat(item.publishTime)}}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </section>
</template>

<script>
import { timestampToTime } from '~/utils/tool'

export default {
  name: 'contents',
  methods: {
    timeformat (time) {
      return timestampToTime(time)
    },
    toDetial (id) {
      this.$router.push({
        path: '/navi/article',
        query: {
          id
        }
      })
    }
  },
  props: {
    leftData: {
      type: Array,
      default: () => []
    },
    rightData: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
.home__article-content{
    width: 1180px;
    overflow: auto;
    margin: 0px auto 10px;
    padding: 0;
    box-sizing: border-box;
    background: #fafafa;
    .article-content-left__section{
      padding-left: 10px;
      // padding-top: 10px;
      height: 96px;
      // border-bottom: 1px solid #eee;
      p{
        font-family: MicrosoftYaHei;
        font-size: 16px;
        color: #333;
        // line-height: 20px;
        text-overflow: ellipsis;
        height: 20px;
        width: 100%;
        overflow: hidden;
      }
      span{
        display: block;
        margin-top: 9px;
        font-family: MicrosoftYaHei;
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        color: #999;
        text-overflow: ellipsis;
      }
      .subtitle{
        width: 80%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .setion-body{
        cursor: pointer;
        padding-bottom: 5px;
        border-bottom: 1px solid #eee;
        margin: 14px 0;
        box-sizing: border-box;
      }
      .setion-body:hover{
        background: #f1f1f1;
      }
      .setion-body:last-child{
        border-bottom: none;
      }
      .section-tags{
        height: 18px;
        line-height: 18px;
        margin-top: 13px;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #656565;
      }
    }
    .el-card__body{
      box-sizing: border-box;
    }
    .content-article{
      padding: 19px;
      height: 80px;
      box-sizing: border-box;
      cursor: pointer;
      h3{
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #333;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      span{
        margin-top: 6px;
        height: 16px;
        line-height: 16px;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #999;
      }
    }
      .content-article:hover{
        background: #f1f1f1;
      }
    .content-img{
      cursor: pointer;
      position: relative;
      // width: 320px;
      height: 180px;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
      span{
        display: block;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        height: 30px;
        line-height: 25px;
        padding-left: 10px;
        box-sizing: border-box;
        font-family: MicrosoftYaHei;
        font-size: 13px;
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: bold;
        background: linear-gradient(transparent, 30%, rgba(0,0,0,0.5));
      }
    }
  }
  .home__article-img{
    width: 1180px;
    margin: 30px auto 0;
    padding: 0;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .home__article-list{
    width: 1180px;
    overflow: auto;
    margin: 0 auto;
    .el-carousel {
      .el-carousel__container{
        height: 430px !important;
      }
    }
    .article-list-card{
      h3{
        height: 48px;
        font-family: MicrosoftYaHei;
        font-size: 16px;
        color: #333;
        line-height: 24px;
        margin-top: 17px;
        overflow: hidden;
      }
      p{
        height: 36px;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #999;
        line-height: 18px;
        margin-top: 16px;
        overflow: hidden;
      }
      .list-card__row{
        font-family: MicrosoftYaHei;
        font-size: 12px;
        color: #656565;
        line-height: 18px;
        margin-top: 23px;
        height: 18px;
      }
    }
  }
  .home__article-link{
    width: 100%;
    background: #949494;
    .content{
      width: 1180px;
      padding: 26px 0;
      height: 162px;
      margin: 0 auto;
      box-sizing: border-box;
      h3{
        color: #FFF;
        font-size: 18px;
        margin-bottom: 20px;
        box-sizing: border-box;
      }
      a{
        text-decoration: none;
        color: #fff;
      }
      ul{
        list-style: none;
        li{
          font-size: 12px;
          text-decoration:none;
          color: #fff;
          display: inline-block;
          margin-right: 50px;
          box-sizing: border-box;
        }
      }
      .content-left{
        float: left;
      }
      .content-right{
        float: right;
        width: 180px;
        ol{
          display: flex;
          li{
            flex: 1;
            text-align: center;
          }
        }
        img{
          width: 45px;
          height: 45px;
        }
        span{
          display: block;
          margin-top: 10px;
          font-size: 12px;
          color: #fff;
        }
      }
    }
  }
</style>
