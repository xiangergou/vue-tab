<template>
    <section class="home__article-ranking">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="18" style="margin-right:20px">
            <div class="ranking_title">
              <h2>最新排行</h2>
              <span>
                <router-link :to="{path: '/nav/list', query: {oneId: 40, listId: 83}}" style="color: #000">更多 ></router-link>
              </span>
            </div>
           <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="12" v-for="(item, i) in allData" :key="i" class="content-list">
                <el-card class="box-card">
                  <div class="ranking_title card-title">
                      <router-link
                        :to="{path: 'nav/list', query: {
                          oneId: item.one, listId: item.listId
                        }}"
                      >
                       <strong style="color: #333;">{{item.type}} ></strong>
                      </router-link>

                    <span>{{timeformat(item.startTime)}} - {{timeformat(item.endTime)}}</span>
                  </div>
                  <el-row justify="space-between" class="card-table__title">
                    <el-col :span="7" :offset="1">排名</el-col>
                    <el-col :span="8" :offset="1">{{item.fields[0]}}</el-col>
                    <el-col :span="8" style="text-align:right">{{item.fields[1]}}</el-col>
                  </el-row>

                  <a :href="k.homePage"
                    style="color: #444444; cursor: pointer;"
                    v-for="(k, v) in item.contents.slice(0, 5)"
                    :key="v">
                    <el-row justify="space-between" class="card-table__body"    >
                      <el-col :span="3" style="text-align:center">
                        <img src="@/assets/images/rank-1.svg" alt="" v-if="v ===0">
                        <img src="@/assets/images/rank-2.svg" alt="" v-else-if="v ===1">
                        <img src="@/assets/images/rank-3.svg" alt="" v-else-if="v ===2">
                        <span v-else> {{v+1}}</span>
                      </el-col>
                      <el-col :span="3" class="avater" :offset="1">
                        <img v-lazy="`http://${k.darenUrl.slice(2)}`" alt="">
                      </el-col>
                      <el-col :span="9" class="nick">{{k.nick}}</el-col>
                      <el-col :span="9" style="text-align:right">
                        {{k['淘指数']}}
                      </el-col>
                    </el-row>
                  </a>
                </el-card>
             </el-col>
           </el-row>
        </el-col>
        <el-col :span="6">
          <div class="ranking_title">
            <h2>榜单解读</h2>
              <router-link :to="{path: '/information', query: {type: 3}}">
              <span>更多 ></span></router-link>
          </div>
          <el-card class="box-card card-news">
             <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                color="#ff502e"
                :timestamp="`${activity.author} ${timeformat(activity.publishTime)}`">
                <p class="text"  @click="toDetial(activity.articleId)">{{activity.title}}</p>
              </el-timeline-item>
            </el-timeline>
          </el-card>
        </el-col>
      </el-row>
    </section>
</template>

<script>
import { timestampToTime, deepClone } from '~/utils/tool'

export default {
  name: 'ranking',
  props: {
    ranklists: {
      type: Array,
      default: () => []
    },
    activities: {
      type: Array,
      default: () => []
    },
    list: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      reverse: true,
      allData: [{type: '主播综合榜'}, {type: '短视频综合榜'}]
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
    timeformat (time) {
      return timestampToTime(time)
    },
    dataFormat () {
      const data = deepClone(this.ranklists)
      data.forEach((item, i) => {
        item.contents = item.contents.map((k, v) => {
          const key = k['达人信息']
          return {...k, ...this.tableData[key]}
        })
      })
      this.allData = data
    }
  },
  watch: {
    'ranklists': {
      handler () {
        this.dataFormat()
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
 .home__article-ranking{
    width: 1180px;
    overflow: auto;
    margin: 0 auto;
    padding: 0;
    box-sizing: border-box;
    background: #fafafa;
    .box-card {
      width: 100%;
      box-sizing: border-box;
      height: 476px;
      overflow: hidden;
      .el-card__body{
        padding: 0 20px;
        box-sizing: border-box;
        cursor: pointer;
      }
      .card-title{
        height: 60px;
        line-height: 60px;
        margin: 0;
        width: 100%;
        strong{
          margin: 0;
          border-left: 3px solid #ff502e;
          padding-left: 6px;
          font-weight: 600;
        }
        span{
          padding-right: 10px;
          font-family: SourceHanSansCN-Regular;
          font-size: 12px;
          color: #666;
          margin-top: 0;
        }
      }
      .card-table__title{
        height: 45px;
        align-items: center;
        justify-content: flex-start;
        display: flex;
        font-size: 14px;
        background: #fff;
        border-bottom: 1px solid #eee;
      }
      .card-table__body{
        height: 74.5px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .avater{
          img{
            width: 46px;
            height: 46px;
            border-radius: 50%;
          }
        }
        .nick{
          font-family: MicrosoftYaHei;
          font-size: 14px;
          color: #333;
          margin-left: 12px;
        }
      }
      .card-table__body:hover{
        background: #f1f1f1;
      }
    }
    .card-news{
      overflow: auto !important;
      .el-card__body{
        padding: 15px 0 0 20px;
        background: #fff;
        box-sizing: border-box;
      }
    }
    .text {
      font-size: 14px;
      width: 230px;
      min-height: 21px;
      max-height: 42px;
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333;
      line-height: 21px;
    }
    .item {
      padding: 18px 0;
    }
  }
  .content-list:first-child{
    margin-right: 20px;
  }
  .ranking_title{
    margin: 24px 0;
    box-sizing: border-box;
    h2{
      font-family: SourceHanSansCN-Regular;
      font-size: 24px;
      display: inline-block;
      color: #333;
      letter-spacing: 1px;
    }
    span{
      margin-top: 10px;
      font-family: SourceHanSansCN-Regular;
      font-size: 14px;
      color: #333;
      cursor: pointer;
      float: right;
    }
  }
</style>
