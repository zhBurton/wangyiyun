<template lang="">
    <div id="swiperTop">
        <!-- 配置完vant组件后可以直接引入使用 下面是懒加载方式 -->
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in state.images" :key="image">
                <img :src="image.pic" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script>
    //这个地方不能进行结构赋值
    import {getBanner} from '@/request/api/home.js'
    // 在组合式api中 生命周期需要引入才能使用
    import { reactive, onMounted } from 'vue'
    // reactive修饰对象成为一个响应式的数据
    export default {
        // vue3的写法
        // 新的apipi用于创建images对象
        // setup是在页面渲染之后
        setup() {
            const state = reactive({
                images: [
                    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
                    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
                ]
            });
            onMounted( async () => {
                // 服务端地址
                // axios.get('http://localhost:3000/banner?type=2').then((res) => {
                //     // console.log(res)
                //     state.images = res.data.banners
                // })
                // await等待getBanner数据的执行完毕
                let res=await getBanner();
                state.images = res.data.banners
                // console.log(res)
            })
            return { state };
        }
    }
</script>
<style lang="less">
    .van-swipe {
        width: 100%;
        height: 3rem;
    }

    .van-swipe .van-swipe-item {
        padding: 0 0.2rem;
    }

    .van-swipe .van-swipe-item img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
    }

    /* 改变轮播的小圆点数据 */
    .van-swipe__indicator--active {
        background-color: rgb(219, 130, 130);
    }
</style>>