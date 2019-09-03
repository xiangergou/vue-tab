<template>
  <section class="navi-container">
    <!-- 临离职 无心重构 后来者加油💪 -->
    <header class="nav" v-if="!isSpecial">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#FB5E42"
        text-color="#fff"
        active-text-color="#fff">
        <el-menu-item :index="''+ (i + 1)" v-for="(item, i) in navList.slice(1)" :key="i">{{item}}</el-menu-item>
        <el-menu-item index="7" style="float:right" >{{navList[0]}}</el-menu-item>
      </el-menu>
    </header>

    <header class="nav" v-else>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#FB5E42"
        text-color="#fff"
        active-text-color="#fff">
        <el-menu-item :index="''+ (i + 1)" v-for="(item, i) in navList" :key="i">{{item}}</el-menu-item>
      </el-menu>
    </header>
    <router-view></router-view>
  </section>
</template>
<script>

export default {
  data () {
    return {
      activeIndex: '1',
      navList: '',
      tableData: [],
      isSpecial: false
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      let path
      let query = null
      switch (+key) {
        case 5:
          path = '/goldBaby'
          query = {
            oneId: 0
          }
          break
        case 6:
          path = '/goldMakeup'
          query = {
            oneId: 1
          }
          break
        case 1:
          path = '/nav/list'
          query = {
            oneId: 40,
            listId: 83
          }
          break
        case 2:
          path = '/nav/list'
          query = {
            oneId: 41,
            listId: 22
          }
          break
        case 3:
          if (!this.isSpecial) {
            path = '/nav/list'
            query = {
              oneId: 42,
              listId: 103
            }
          } else {
            path = '/nav/list'
            query = {
              oneId: 43,
              listId: 0
            }
          }
          break
        case 4:
          path = '/nav/list'
          query = {
            oneId: 43,
            listId: 0
          }
          break
        case 7:
          path = '/nav/list'
          query = {
            oneId: 39,
            listId: 55
          }
          break
      }
      this.$router.push({
        path,
        query
      })
    },
    async init () {
    },
    async initData () {
      const data = JSON.stringify(this.$store.getters.allDirs) !== '{}'
        ? this.$store.getters.allDirs
        : await this.$store.dispatch('GetBydir')

      this.navList = Object.keys(data)
      const list = window.location.href.split('&hidde=').slice(1, 3).map(item => window.decodeURI(item)) || []
      if (list && list.length > 0) {
        this.isSpecial = true
      }
      // 榜单页 导航栏
      this.navList = this.navList.filter(item => !list.includes(item))
    }

  },
  created () {
    const query = this.$route.query
    switch (+query.oneId) {
      case 40:
        this.activeIndex = '1'
        break
      case 41:
        this.activeIndex = '2'
        break
      case 42:
        this.activeIndex = '3'
        break
      case 43:
        this.activeIndex = '4'
        break
      case 39:
        this.activeIndex = '7'
        break
      case 0:
        this.activeIndex = '5'
        break
      case 1:
        this.activeIndex = '6'
        break
    }
    this.initData()
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.navi-container{
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
        font-weight: 600;
      }
    }
  }
}
</style>
