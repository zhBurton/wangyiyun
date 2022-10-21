<template>
  <div>
    <TopNav />
    <SwpierTop />
    <IconList />
    <MusicList/>
  </div>
</template>

<script>
  // @ is an alias to /src @是src的别名
  import TopNav from '@/components/home/TopNav.vue'
  import SwpierTop from '@/components/home/SwpierTop.vue'
  import IconList from '@/components/home/IconList.vue'
  import MusicList from '@/components/home/MusicList.vue'
  export default {
    name: 'HomeView',
    // 注册
    components: {
      TopNav,
      SwpierTop,
      IconList,
      MusicList
    }
  }
</script>