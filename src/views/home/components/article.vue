<template>
  <section class="home__article-list">
      <div class="ranking_title" style="margin-bottom:14px">
        <h2>这就是爆文</h2>
      </div>
      <el-carousel indicator-position="outside" arrow="never" style="overflow:hidden">
        <el-carousel-item v-for="(item, i) in pageQuerylist" :key="i" style="overflow:hidden">
          <div>
            <el-row :gutter="10">
              <el-col :span="6" v-for="(j, k) in item" :key="k" style="margin-top:10px;">
                <a :href="j.link">
                  <el-card shadow="hover" class="article-list-card">
                    <h3>{{j.title}}</h3>
                    <p>{{j.brief}}</p>
                    <el-row class="list-card__row">
                      <el-col :span="12" style="text-align:left">
                        {{j.daren}}
                      </el-col>
                      <el-col :span="12"  style="text-align:right">
                        阅读量：{{j.readCount}}w
                      </el-col>
                    </el-row>
                  </el-card>
                </a>
              </el-col>
            </el-row>
          <br/>
        </div>
        </el-carousel-item>
      </el-carousel>
    </section>
</template>

<script>
export default {
  name: 'articles',
  serverCacheKey () {
    // Will change every 10 secondes
    return Math.floor(Date.now() / 10000)
  },
  props: {
    pageQuerylist: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>

</style>
