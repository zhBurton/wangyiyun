<template>
  <router-view />
  <!-- 歌单播放可以在全局显示即在app中引入组件 全局显示即可以在路由跳转时也会显示全局引入的组件 -->
  <FooterMusic  v-show='$store.state.isFooterMusic'/>
</template>
<script>
import FooterMusic from '@/components/item/FooterMusic'
export default {
  setup(props) {

  },
  components: {
    FooterMusic,
  }
}
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* svg形式必须通过设置width和height进行设置字体图标大小 font-class是通过fontSize设置大小的 */
.icon {
  /* 根据初始的html字体大小设置宽高 这里面的rem不是rem.js设置的而是插件设置的*/
  width: 0.5rem;
  height: .5rem;
}

a {
  color: black;
}
</style>