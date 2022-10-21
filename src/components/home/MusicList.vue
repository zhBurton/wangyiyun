<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>
        <div class="musicContent">
            <!-- 150是每个van-swipe-item的宽度 -->
            <van-swipe :loop="false" :width="150" class="my-swipe" :show-indicators="false">
                <!-- v-for必须需要key -->
                <van-swipe-item v-for="(item,index) in  state.musicList" :key="index">
                    <!-- 进行路由跳转 -->
                    <!-- router-link在页面渲染时会被解析成一个a标签 -->
                    <!-- path是跳转的路由地址 query是向路由传递的参数，根据参数显示不同的内容 -->
                    <router-link :to="{path:'/itemMusic',query:{id:item.id}}">
                    <img :src="item.picUrl" alt="">
                    <span class="playCount">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-zanting3-copy"></use>
                        </svg>
                        {{changeCount(item.playCount)}}
                    </span>
                    <span class="name">{{item.name}}</span>
                </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>
<script>
    import { getMusicList } from '@/request/api/home.js'
    import { reactive, onMounted } from 'vue'
    export default {
        // vue2的写法
        //#region 
        // data() {
        //     return {
        //         musicList: []
        //     }
        // },
        // methods: {
        //     async getGenduo() {
        //         let res = await getMusicList()
        //         console.log(res)
        //         this.musicList = res.data.result
        //     },
        //     changeCount(num) {
        //         // toFixed保留几位小数
        //         if (num > 100000000) { return (num / 100000000).toFixed(1) + '亿' }
        //         else if (num > 10000) { return (num / 10000).toFixed(1) + '万' }
        //     }
        // },
        // mounted() {
        //     this.getGenduo()
        // },
        //#endregion
        // vue3的写法
        setup() {
            const state = reactive({
                musicList: []
            })
            function changeCount(num) {
                // toFixed保留几位小数
                if (num > 100000000) { return (num / 100000000).toFixed(1) + '亿' }
                else if (num > 10000) { return (num / 10000).toFixed(1) + '万' }
            }
            onMounted(async() => {
                let res = await getMusicList();
                // console.log(res)
                state.musicList = res.data.result;
            })
            // vue3需要返回dom中使用的方法和数据
            return {state,changeCount}
        }
    }
</script>
<style scoped>
    .musicList {
        width: 100%;
        height: 5rem;
        padding: 0.2rem;
    }

    .musicTop {
        width: 100%;
        height: 0.6rem;
        justify-content: space-between;
        margin-bottom: 0.2rem;
        display: flex;
    }

    .title {
        font-size: 0.4rem;
        font-weight: 900;
    }

    .more {
        border: 1px solid #ccc;
        text-align: center;
        line-height: 0.6rem;
        padding: 0 0.2rem;
        border-radius: 0.4rem;
    }

    .musicContent {
        width: 100%;
        height: 4rem;
    }

    .musicContent .my-swipe {
        height: 100%;
    }

    .musicContent .my-swipe img {
        width: 100%;
        height: 60%;
    }

    .playCount {
        color: white;
        position: absolute;
        top: 0.1rem;
        right: 0.4rem;
        z-index: 2;
    }

    .my-swipe .playCount .icon {
        position: relative;
        width: 0.3rem;
        height: 0.3rem;
        top: 1px;
        left: 0.1rem;
    }
</style>