<template>
  <div class="list-container">
    <div v-if="!isSpecial">
      <el-card class="box-card" v-if="!(+oneId === 43)">
        <div style="margin-bottom:25px;">
          <span v-if="+oneId === 40 || +oneId === 42">类型:</span>
          <el-radio-group v-model="secondRadio" size="mini" @change="secondRadioChange">
            <el-radio :label="item.twoId" v-for="(item, i) in secondary" :key="i" >{{item.twoName}}</el-radio>
          </el-radio-group>
        </div>
        <div style="display:flex">
          <span style="width:60px" v-if="+oneId === 40 || +oneId === 42">领域:</span>
          <el-radio-group v-model="thirdRadio" size="mini" @change="thirdRadioChange" style="flex:1;">
            <el-radio :label="item.threeId" v-for="(item, i) in thirdArr" :key="i">{{item.threeName}}</el-radio>
          </el-radio-group>
        </div>
      </el-card>
      <div v-else class="special_header">
        <strong>{{curItem.twoName}}</strong>
        <span>{{curItem.name}} </span>
      </div>
      <el-card class="box-card card-table">
        <div>
          <el-select v-model="count" placeholder="请选择"
            size="mini" style="width:224px" @change="timeChange">
            <el-option
              v-for="item in setOptions(timeList)"
              :key="item.count"
              :label="item.key"
              :value="item.count">
            </el-option>
          </el-select>
          <router-link :to="{path: '/navi/article', query: { id: 329}}" style="float:right">
            <el-button plain size="mini">榜单说明</el-button>
          </router-link>
        </div>

        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            v-for="(item, i) in crtTableHead"
            :key="i"
            align="center"
            :label="item.key"
            :width="(i === 1 && 240) || (i === 8 && 160) || (i === 0 && 110)|| (i === 7 && 160)"
          >
            <!-- table-head -->
            <template slot="header" v-if="item.key.includes('粉丝号召指数')">
              <el-popover
                placement="top-start"
                width="300"
                offset="150"
                trigger="hover"
                content="粉丝号召指数衡量达人运营粉丝的能力。主要从达人的粉丝规模、新粉丝转化能力、老粉丝活跃度三个子维度来综合评估。">
               <span slot="reference" style="color: #909399">
                  粉丝号召指数
                 <img src="@/assets/images/u-question.png" alt="" style="width:13px;height:13px;margin-bottom: 2px;vertical-align: middle;border-style: none;">
               </span>
              </el-popover>
            </template>

            <template slot="header" v-if="item.key.includes('内容消费指数')">
              <el-popover
                placement="top-start"
                width="300"
                offset="150"
                trigger="hover"
                content="内容消费指数衡量达人内容营销的影响力。主要从达人通过内容带来的浏览、互动，以及账号活跃度三个子维度来综合评估。">
               <span slot="reference" style="color: #909399">
                  内容消费指数
                 <img src="@/assets/images/u-question.png" alt="" style="width:13px;height:13px;margin-bottom: 2px;vertical-align: middle;border-style: none;">
               </span>
              </el-popover>
            </template>

            <template slot="header" v-if="item.key.includes('商业转化指数')">
              <el-popover
                placement="top-start"
                width="300"
                offset="150"
                trigger="hover"
                content="商业转化指数衡量达人通过内容营销实现商业转化的能力，可进一步细分为内容转化指数和商家服务指数两个子维度。其中，内容转化指数评估达人内容从进店、收藏、加购、成交全链路的营销转化能力，商家服务指数反映达人通过内容服务商家能力。">
               <span slot="reference" style="color: #909399">
                  商业转化指数
                 <img src="@/assets/images/u-question.png" alt="" style="width:13px;height:13px;margin-bottom: 2px;vertical-align: middle;border-style: none;">
               </span>
              </el-popover>
            </template>

            <template slot="header" v-if="item.key.includes('内容转化指数')">
              <el-popover
                placement="top-start"
                width="300"
                offset="150"
                trigger="hover"
                content="内容转化指数衡量商家内容的全链路营销转化能力。主要从商家通过内容带来的进店、收藏、加购、成交四个子维度来综合评估。">
               <span slot="reference" style="color: #909399">
                  内容转化指数
                 <img src="@/assets/images/u-question.png" alt="" style="width:13px;height:13px;margin-bottom: 2px;vertical-align: middle;border-style: none;">
               </span>
              </el-popover>
            </template>

            <template slot="header" v-if="item.key.includes('淘指数')">
              <el-popover
                placement="top-start"
                width="300"
                offset="150"
                trigger="hover"
                content="淘指数衡量达人内容营销的综合能力，反映达人通过内容获取用户、转化用户、运营用户的能力。">
               <span slot="reference" style="color: #909399">
                  淘指数
                 <img src="@/assets/images/u-question.png" alt="" style="width:13px;height:13px;margin-bottom: 2px;vertical-align: middle;border-style: none;">
               </span>
              </el-popover>
            </template>

            <!-- table-body -->
            <template slot-scope="scope">
              <div v-if="item.key === '序号'">
                <div style="float:left; text-align:center">
                  <span v-if="+scope.row[item.key] === 1">
                      <img src="@/assets/images/rank-1.svg" alt="">
                  </span>
                  <span v-else-if="+scope.row[item.key] === 2">
                      <img src="@/assets/images/rank-2.svg" alt="">
                  </span>
                  <span v-else-if="+scope.row[item.key] === 3">
                      <img src="@/assets/images/rank-3.svg" alt="">
                  </span>
                  <span v-else> {{scope.row[item.key]}}</span>
                </div>
                <p style="color: green"
                  v-if="scope.row['change'].charAt(0) === '↓'">
                  {{scope.row['change']}}
                </p>
                <p style="color: red"
                  v-else-if="scope.row['change'].charAt(0) === '↑'">
                  {{scope.row['change']}}
                </p>
                <p v-else>{{scope.row['change']}}</p>
              </div>
              <div v-else-if="item.key.indexOf('信息') > -1">
                <div  class="avater" style="display: flex; justify:center;align-items:center">
                  <img v-lazy="formatImgurl(scope.row.darenUrl)" alt="">
                  <div>
                    <span> {{scope.row['nick']}}</span>
                      <p>{{scope.row['area']}}</p>
                  </div>
                  <div style="display: flex; justify:center;align-items:center" v-if="scope.row['wirelessQr']">
                    <el-popover
                      placement="top"
                      width="100"
                      trigger="hover">
                      <img :src="scope.row['wirelessQr']" alt="" style="width:80px;height:80px;">
                      <p>用手机淘宝扫码查看</p>
                      <span slot="reference" style="width:18px;height:18px;">
                        <img :src="scope.row['wirelessQr']" alt="" style="width:18px; height:18px;border-radius:0">
                      </span>
                    </el-popover>
                  </div>
                  <div v-else  style="display: flex; justify-content:center;align-items:center">
                    <img src="@/assets/images/qrcode-noclick.svg" alt="" style="width: 18px; height: 18px; border-radius:0;">
                  </div>
                </div>
              </div>
              <div v-else-if="item.key.indexOf('店铺名称') > -1">
                <div  class="avater">
                  <div class="avater">
                    <img v-lazy="formatImgurl(scope.row['店铺头图'])" alt="">
                    <div>
                      <span> {{scope.row['店铺名称']}}</span>
                      <p>{{scope.row['主营品类']}}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else-if="item.key.includes('旗下top达人')">
                <div class="jigou_info">
                  <div class="jigou__avater avater" v-for="(k, v) in scope.row['darenInfoDo'] && scope.row['darenInfoDo'].slice(0, 2)" :key="v">
                    <img v-lazy="formatImgurl(k.picUrl)" alt="">
                    <p>{{k.nick}}</p>
                  </div>
                </div>
              </div>

              <div v-else-if="item.key.indexOf('服务评分') > -1">
                {{scope.row['avgScore'] || '--'}}
              </div>
              <div v-else-if="item.key.indexOf('合作') > -1">
                <a :href="`https://v.taobao.com/v/home?userId=${scope.row['达人信息'] || scope.row['机构信息']}`" style="color: #000" v-if="scope.row['wirelessQr']">
                  <img src="@/assets/images/jump.svg" alt="" style="width:28px; height: 28px; cursor: pointer;">
                </a>
                <img src="@/assets/images/jump-noclick.svg" alt="" v-else>
              </div>
              <div v-else-if="item.key.indexOf('分享') > -1">
                <span @click="toShare(scope.row)">
                  <img src="@/assets/images/share.png" alt="" style="width:20px; height: 20px; cursor: pointer;">
                </span>
              </div>
              <div v-else-if="item.key.indexOf('基地头像') > -1">
                <img v-lazy="formatImgurl(scope.row['基地头像'])" alt=""
                style="width: 46px; height: 46px;">
              </div>
              <div v-else>
                {{scope.row[item.key]}}
              </div>
            </template>
          </el-table-column>
        </el-table>

        <div style="width: 100%;height:40px;text-align:center" v-loading="loading">
          <!-- <el-button v-waves size="small" @click="readMore"
          style="margin: 20px auto">点击加载更多</el-button> -->
        </div>
      </el-card>
    </div>
    <!-- 特色榜 List -->
    <div v-else class="special_wrapper">
      <div class="content" v-for="(item, i) in specialArr" :key="i"
      @click="handToDetial(item.id)">
        <h2>{{item.twoName}}</h2>
        <el-card :body-style="{ padding: '0px', height: '156px'  }">
          <div class="content-img">
            <img v-lazy="item.cover" class="image">
            <span>{{item.name}}
              <i>{{timestampToTime(item.date)}}</i>
            </span>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 分享dialog -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="520px"
      >
      <div style="width:100%;text-align:center">
        <div class="dialog-img-create" ref="imgBox" style="margin-bottom: 20px">
          <div id="qrcode"></div>
          <img src='static/tbd.png' alt="" class="static-img">
        </div>
        <span>打开微信扫码，分享达人排名</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { timestampToTime, deepClone, flat } from '~/utils/tool'
import { listApi } from '~/api/latestlist.js'
import QRCode from 'qrcodejs2'

export default {
  data () {
    return {
      secondRadio: '',
      thirdRadio: '',
      tableData: [],
      options: [],
      value: '',
      timer: null,
      page: 1,
      navList: null,
      secondary: [], // 二级目录
      thirdArr: [], // 三级目录
      allData: [],
      getDirsData: null,
      timeList: [],
      count: '',
      crtTableHead: [],
      loading: false,
      dirs: '',
      specialArr: [],
      isSpecial: false,
      oneId: '',
      dialogVisible: false,
      imgUrl: '',
      hasDataChange: true
    }
  },
  computed: {
    curItem () {
      return this.oneId === 43 && this.specialArr.find(item => item.id === this.listId)
    }
  },
  components: { QRCode },
  methods: {
    // 二维码生成
    qrcode (item) {
      const url = `https://tbd.wshang.com/mobile/share?oneId=${this.oneId}&listId=${this.listId}&id=${item['达人信息']}&count=${this.count}&rank=1&value=${item['淘指数']}&avatar=http%3A%2F%2Fimg.alicdn.com%2Fimgextra%2Fi2%2F325013182%2FO1CN01luFZFL1ZNOowRBQVJ_!!325013182-0-beehive-scenes.jpg&name=`

      let qrcode = new QRCode('qrcode', {
        width: 200,
        height: 200, // 高度
        text: url// 二维码内容
      })
      console.log(qrcode)
    },
    toShare (item) {
      this.$nextTick(() => {
        if (document.querySelector('#qrcode')) {
          document.querySelector('#qrcode').innerHTML = ''
        }
        setTimeout(() => {
          this.qrcode(item)
        }, 4)
      })

      this.dialogVisible = true
    },
    handToDetial (id) {
      this.$router.push({
        path: '/nav/list',
        query: {
          oneId: 43,
          listId: id
        }
      })
    },
    timestampToTime (val) {
      return timestampToTime(val)
    },
    secondRadioChange (val) {
      const thirdArr = this.secondary.find(item => {
        return item.twoId === val
      })
      this.thirdArr = thirdArr.children

      const thirdRadio = this.thirdArr.find(item => item.threeId === +this.listId)

      this.thirdRadio = (thirdRadio && thirdRadio.threeId) || (this.thirdArr && this.thirdArr[0].threeId)

      this.thirdRadioChange(this.thirdRadio)
    },
    setOptions (timeList) {
      timeList.forEach(item => {
        item.key = `${timestampToTime(item.startTime)} - ${timestampToTime(item.endTime)}`
      })
      return timeList
    },

    formatImgurl (url) {
      if (!url) return
      if (url.indexOf('http') > -1) {
        return url
      } else {
        return `http://${url}`
      }
    },
    thirdRadioChange (val) {
      this.$router.push({
        path: '/nav/list',
        query: {
          oneId: this.oneId,
          listId: val
        }
      })
    },
    getTimeList () {
      if (+this.listId !== 0) {
        const id = this.$route.query.listId || this.thirdRadio
        listApi.getPublishdetail({id}).then(async res => {
          this.timeList = res.data.data
          this.count = res.data.data[0].count
          this.getInfo()
        })
      }
    },
    async getInfo () {
      const id = this.$route.query.listId || this.thirdRadio
      const list = await listApi.getPageQuery({id, count: this.count, page: 1, pageSize: 20})
      this.tableData = list.data.data.contents
      if (+this.oneId === 40 || +this.oneId === 43 || +this.oneId === 39) {
        // 达人信息
        let darens = this.tableData.map(item => item['达人信息']).toString()
        if (darens) {
          const dareninfo = await listApi.getListdareninfo({darens})
          this.tableData = this.tableData.map(item => {
            return {...item, ...dareninfo.data.data[item['达人信息']]}
          })
        }
      } else if (+this.oneId === 41) {
        // 机构信息
        let organizations = this.tableData.map(item => item['机构信息']).toString()
        const dareninfo = await listApi.getListOrginfo({organizations})

        this.tableData = this.tableData.map(item => {
          return {...item, ...dareninfo.data.data[item['机构信息']]}
        })
      }
    },
    async timeChange () {
      const id = this.$route.query.listId || this.thirdRadio
      const list = await listApi.getPageQuery({id, count: this.count, page: 1, pageSize: 20})
      this.tableData = list.data.data.contents

      let darens = this.tableData.map(item => item['达人信息']).toString()
      if (+this.oneId !== 41) {
        const dareninfo = await listApi.getListdareninfo({ darens })
        this.tableData = this.tableData.map(item => {
          return { ...item, ...dareninfo.data.data[item['达人信息']] }
        })
      } else {
        // 机构信息
        let organizations = this.tableData.map(item => item['机构信息']).toString()
        const dareninfo = await listApi.getListOrginfo({ organizations })

        this.tableData = this.tableData.map(item => {
          return { ...item, ...dareninfo.data.data[item['机构信息']] }
        })
      }
      this.page = 1
      this.hasDataChange = true
    },
    async readMore () {
      this.loading = true
      this.page += 1
      const list = await listApi.getPageQuery({id: this.thirdRadio || this.listId, count: this.count, page: this.page, pageSize: 20})
      setTimeout(() => {
        this.loading = false
      }, 10)
      if (list.data.data.contents.length > 0) {
        let darens = list.data.data.contents.map(item => item['达人信息']).toString()
        const dareninfo = await listApi.getListdareninfo({darens})

        const tableData = list.data.data.contents.map(item => {
          return {...item, ...dareninfo.data.data[item['达人信息']]}
        })
        this.tableData.push(...tableData)
        this.hasDataChange = true
      }
    },
    async initRadio () {
      this.crtTableHead = []
      this.dirs = deepClone(JSON.stringify(this.$store.getters.allDirs) !== '{}'
        ? this.$store.getters.allDirs
        : await this.$store.dispatch('GetBydir'))

      const dataArr = []
      Object.keys(this.dirs).forEach(item => {
        dataArr.push(this.dirs[item])
      })
      // 当前榜单数据
      const curData = dataArr.find(item => {
        return item.oneId === +this.oneId
      })

      // 特色榜表头
      if (+this.oneId === 43) {
        this.specialArr = curData.children.sort((a, b) => +b.twoId - +a.twoId)
        if (+this.listId !== 0) {
          const crtTableHead = this.specialArr.find(item => +item.id === +this.listId)

          this.crtTableHead = crtTableHead.children[0].descContent
        }
      } else {
        // 2级radio列表
        this.secondary = curData.children

        // 根据listId，即3级id反推2级
        const curDataSecond = curData.children.find(item => {
          if (item && item.children) {
            const flag = item.children.find(k => +k.threeId === +this.listId)
            return flag && item
          }
        })
        this.secondRadio = (curDataSecond && curDataSecond.twoId) || (curData.children && curData.children[0].twoId)

        // 再根据2级推3级
        this.thirdArr = curDataSecond.children
        this.thirdRadio = +this.listId

        const threeArr = this.secondary.map(item => {
          return item.children
        })
        // flat某些浏览器版本支持欠佳
        const curThreeData = flat(threeArr).find(item => {
          return item.threeId === this.thirdRadio
        })
        this.crtTableHead = curThreeData.descContent
      }

      // 商家榜表头做特殊处理
      if (+this.oneId === 42) {
        this.crtTableHead = this.crtTableHead.filter(item => {
          return (item.key !== '店铺头图' && item.key !== '主营品类')
        })
      }

      if (+this.oneId !== 41 && +this.listId !== 22) {
        this.crtTableHead.push({key: '分享'})
      }

      if (!this.isSpecial) {
        this.getTimeList()
      }
    },
    scrollBtm () {
      let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 200
      if (bottomOfWindow && this.hasDataChange && this.count && !this.isSpecial) {
        this.hasDataChange = false
        this.readMore()
      }
    }
  },
  created () {
    const query = this.$route.query
    this.oneId = query.oneId
    this.listId = query.listId
    this.initRadio() // 初始化2级和3级选项
    this.isSpecial = +this.oneId === 43 && +this.listId === 0
    window.addEventListener('scroll', this.scrollBtm)
  },
  // destroyed () {
  //   window.removeEventListener('scroll', this.scrollBtm)
  // },
  watch: {
    $route (newValue, oldValue) {
      this.oneId = newValue.query.oneId
      this.listId = newValue.query.listId
      this.isSpecial = +this.oneId === 43 && +this.listId === 0
      this.page = 1
      this.initRadio()
      this.hasDataChange = true
      window.addEventListener('scroll', this.scrollBtm)
    }
  }
}
</script>

<style scoped lang="scss">
.list-container{
  width: 1180px;
  margin: 0 auto;
  padding-top: 20px;
  .box-card{
    margin-bottom: 20px;
    .el-card__body{
      padding-left: 0;
    }
    span{
      display: inline-block;
      vertical-align: top;
      // margin-left: 10px;
      width: 58px;
      font-family: SourceHanSansCN-Normal;
      font-size: 14px;
      color: #333;
    }
    ul{
      display: inline-block;
      li{
        display: inline-block;
      }
    }
  }
  .card-table__title{
    margin: 10px;
    padding: 10px;
    text-align: left;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    font-family: SourceHanSansCN-Regular;
    font-size: 14px;
    color: #666;
    font-weight: 400;
    text-align: center;
  }
  .card-table__body{
    margin: 10px;
    padding: 10px 0;
    display: flex;
    align-items: center;
    font-family: SourceHanSansCN-Regular;
    font-size: 14px;
    color: #666;
    font-weight: 400;
    text-align: center;
  }
   .avater{
     img{
      width: 46px;
      height: 46px;
      border-radius: 50%;
     }
     display: flex;
     div{
       flex: 1;
       span{
         width: 100%;
         display: inline-block;
       }
       p{
        color: #999;
        font-size: 12px;
        max-width: 176px;
        text-overflow: ellipsis;
        display: inline-block;
       }
     }
  }
  .activeTab{
    text-align: left;
  }
  .lineBg{
    background-color: #f8f8f8;
  }
  .special_wrapper{
    padding: 32px 10px;
    box-sizing: border-box;
    .content{
      margin-bottom: 40px;
      h2 {
        padding-left: 15px;
        height: 24px;
        line-height: 24px;
        font-family: SourceHanSansCN-Regular;
        font-size: 24px;
        color: #333;
        letter-spacing: 1px;
        border-left: 4px solid #ff502e;
        margin-bottom: 25px;
      }
    }
  .el-card{
    width: 280px;
    height: 156px;
  }
}
  .content-img{
      position: relative;
      // width: 320px;
      // height: 180px;
      height: 100%;
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
        line-height: 30px;
        padding-left: 10px;
        box-sizing: border-box;
        font-family: MicrosoftYaHei;
        font-size: 13px;
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: bold;
        white-space: nowrap;
        background: linear-gradient(transparent, 30%, rgba(0,0,0,0.5));
        i{
          float: right;
          margin-right: 10px;
        }
      }
    }
  .special_header{
    strong{
      font-family: SourceHanSansCN-Regular;
      font-size: 24px;
      color: #333;
      letter-spacing: 1px;
    }
    span{
      color: #ff502e;
      height: 20px;
      line-height: 20px;
      font-family: SourceHanSansCN-Regular;
      font-size: 14px;
      letter-spacing: .58px;
      margin-left: 44px;
      cursor: pointer;
    }
  }
  .dialog-content{
    text-align: center;
  }

  .dialog-img-create{
    position: relative;
    width: 200px;
    padding:0;
    margin: 0 auto;
    #qrcode{
      width: 100%;
      padding:0;
      margin: 0 auto;
      text-align: center;
    }
    #qrcode canvas + img {
      margin: 0 auto;
      width: 100%;
      height: 100%;
    }
    img{
        margin: 0 auto;
      }

    .static-img{
      position: absolute;
      width: 50px;
      height: 50px;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }
  .el-dialog__body{
    text-align: center;
  }
  .el-radio{
    margin-bottom: 10px;
  }
  .jigou_info{
    display: flex;
    .jigou__avater{
      flex:1;
      display: block;
      img{
        width: 36px;
        height: 36px;
      }
      p{
        width: 70px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
    }
  }

}
</style>
