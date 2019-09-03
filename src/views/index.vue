/*
 * @Author: liuxia
 * @Date: 2019-08-22 09:35:01
 * @Last Modified by: liuxia
 * @Last Modified time: 2019-08-23 16:53:58
 */

<template>
  <div class="app-container">
    <header class="app_wrapper">
      <el-menu :default-active="activeIndex" class="el-menu-demo"   mode="horizontal" @select="handleSelect">
        <el-menu-item style="padding-left:0">
          <router-link to="/home" class="navbar-logo">
            <img src="@/assets/images/logo.svg"
            style="height: 40px;">
          </router-link>
          <router-link to="/home" class="navbar-logo">
            <img src="@/assets/images/logo-word.png"
            style="height: 40px;width: 120px;margin-left: 10px">
          </router-link>
        </el-menu-item>
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2" >榜单</el-menu-item>
        <el-menu-item index="3" >内容电商</el-menu-item>
        <el-menu-item style="float: right">
          <el-input placeholder="请输入关键词搜索" v-model="keywords" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" v-waves @click="search"></el-button>
        </el-input>
        </el-menu-item>
      </el-menu>
    </header>
    <!-- 右侧浮动弹框 fixed -->
    <div class="fixed">
      <a href="https://tbd.wshang.com" target="_blank">
        <el-button class="home-active__btn">
          <div @mouseout="active=false"  @mouseover="active=true">
            <div  v-if="active" class="btn-more">
              <p style="margin-bottom: 2px">更多</p>
              <p>内容</p>
            </div>
            <img src="@/assets/images/home.svg" alt="" style="width:46px;
            height: 46px;" v-else>
          </div>
        </el-button>
      </a>
      <el-button>
        <el-popover
          placement="left"
          width="80px"
          trigger="hover">
          <div class="wx-code">
            <img src="@/assets/images/little-weixin.png" alt="">
            <p style="text-align: center;margin-top:3px;">小榜微信号</p>
          </div>
          <p slot="reference">
            <img src="@/assets/images/navi-wx.svg" alt="">
          </p>
        </el-popover>
      </el-button>
      <el-button>
        <el-popover
          placement="left"
          width="80px"
          trigger="hover">
          <div class="wx-code">
            <img src="@/assets/images/gzh.png" alt="">
            <p style="text-align: center; margin-top:3px;">官网公众号</p>
          </div>
          <p slot="reference">
            <img src="@/assets/images/navi-qr.svg" alt="">
          </p>
        </el-popover>
      </el-button>
      <el-button @click="backTop">
        <div class="arrow"></div>
        <p style="margin-top: 3px;font-size: 14px;">TOP</p>
      </el-button>
    </div>
    <!-- body -->
    <router-view/>
  </div>
</template>
<script>

export default {
  name: 'Index',
  data () {
    return {
      activeIndex: '1',
      keywords: '',
      active: false
    }
  },
  methods: {
    search () {
      this.$router.push({
        path: '/search',
        query: {
          keyword: this.keywords,
          key: +new Date()
        }
      })
    },
    handleSelect (key, keyPath) {
      switch (key) {
        case '1':
          this.$router.push({
            path: '/home'
          })
          break
        case '2':
          this.$router.push({
            path: '/nav',
            query: {
              oneId: 40,
              listId: 83
            }
          })
          break
        case '3':
          this.$router.push({
            path: '/information'
          })
          break
      }
    },
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop () {
      let that = this
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
    },

    // 计算距离顶部的高度
    scrollToTop () {
      let that = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
    }
  },
  created () {
    const url = window.location.href
    this.activeIndex = url.includes('home') ? '1' : (url.includes('information') || url.includes('article')) ? '3' : '2'
  },
  mounted () {
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
  },
  watch: {
    $route (newValue, oldValue) {
      const url = window.location.href
      this.activeIndex = url.includes('home') ? '1' : (url.includes('information') || url.includes('article')) ? '3' : '2'
    }
  }
}
</script>

<style lang="scss">
.app-container {
  background: #f7f7f7;
  .app_wrapper{
    overflow: auto;
    .el-menu{
      border: none !important;
      margin: 0 auto;
      height: 60px;
      width: 1180px;
      background: #fafafa;
    }
    .el-menu--horizontal>.el-menu-item.is-active{
      color: #ff502e !important;
      font-family: SourceHanSansCN-Regular;
      font-size: 14px;
      cursor: pointer;
    }
    .el-input-group__append button.el-button{
      padding: 12px;
    }
  }
  .fixed{
    position: fixed;
    bottom: 70px;
    right: 50%;
    z-index: 999;
    transform: translateX(680px);
    width: 46px;
    .home-active__btn{
      background:#ff502e;
      color:#fff;
      border:none;
      .btn-more{
        margin-top:-3px;
        margin-right:-3px;
        font-weight: 400;
        p{
          letter-spacing: 4px;
        }
      }
    }
    button{
      width: 46px;
      height: 46px;
      background: #fff;
      margin-bottom: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      padding:0;
      img{
        width: 100%;
        height: 100%;
        margin: 0;
      }

    }
    .el-button+.el-button{
      margin-left:0;
    }
  }
  .arrow{
    margin: 0 auto;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #666;
  }
}
.el-popover{
  // width: 80px !important;
  padding: 10px 10px 30px !important;
  min-width: 50px !important;
  text-align: center;
  .wx-code{
    width: 80px !important;
    height: 80px;
    box-sizing: border-box;
    img {
      vertical-align: middle;
      border-style: none;
      width: 100%;
    }
  }
}
</style>
