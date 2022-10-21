<!-- 跳转的路由（也就是点击一个地址（可以是任意）调转到该页面） -->
<template>
    <!-- state.playlist是点击的那个保存的信息 -->
  <ItemMusicTop :playlist='state.playlist'/>
  <!-- 第一个参数是遍历得到的列表数，第二个得到的是点击的图片的收藏数 -->
  <ItemMusicList :itemList="state.itemList" :subscribedCount='state.playlist.subscribedCount'/>
</template>
<script>
    // 可以通过useRouter方法拿到路由的参数和数据
    import { useRoute } from 'vue-router'
    import { onMounted, reactive } from 'vue'
    import {getMusicItemList,getItemList} from '@/request/api/item.js'
    import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
    import ItemMusicList from '@/components/item/ItemMusicList.vue'
    // 拿到路由传递的参数 
    export default {
        setup() {
            const state = reactive({
                playlist: {},//歌单的详情页的数据
                itemList:[]//歌单的词曲
            })
            // 等待箭头函数运行完成
            onMounted(async () => {
                // useRouteruse不写（）拿到的是引用
                // 拿到该函数实例
                // console.log(useRoute())
                // 注意观看userRoute（）这个实例对象 里面只有鲜亮的颜色是属性可以通过.的形式获取其他的都不可以直接获取 例如就不能query.value.id获取传入的id。id是query的属性而存在的。
                let id = useRoute().query.id
                // console.log(id)
                // 获取歌单详情页
                let res = await getMusicItemList(id);
                // console.log(res)
                // playlist是那个点击的内容
                state.playlist = res.data.playlist
                // console.log(state.playlist)
                // 获取歌单的歌曲
                let result= await getItemList(id)
                state.itemList=result.data
                // console.log(state.itemList)
                // console.log(state.playlist.subscribedCount)
                // 防止页面刷新ItemMusicTop的数据丢失，即将数据保存到sessionsStorage
                sessionStorage.setItem('itemDetail',JSON.stringify(state))
            })
            return {state}
        },
        components:{
            ItemMusicTop,
            ItemMusicList
        }
    }
</script>