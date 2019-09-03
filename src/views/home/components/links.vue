<template>
    <section class="home__article-link">
      <div class="content">
        <div class="content-left">
          <h3>友情链接</h3>
          <ul>
              <li v-for="(item, i) in listlinks" :key="i">
                <a :href="item.link">
                  {{item.name}}
                </a>
              </li>
          </ul>
        </div>
        <div class="content-right">
            <h3>联系我们</h3>
            <ol>
              <li>
                <img src="@/assets/images/little-weixin.png">
                <span>小榜微信号</span>
              </li>
              <li>
                <img src="@/assets/images/gzh.png">
                <span>微信公众号</span>
              </li>
            </ol>
        </div>
      </div>
    </section>
</template>

<script>
export default {
  name: 'links',
  serverCacheKey: props => props.listlinks,
  props: {
    listlinks: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.home__article-link{
  font-weight: bold;
}
</style>
