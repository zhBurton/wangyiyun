<template>
    <!-- 播放列表 -->
    <div class="FooterMusic">
        <div class="footerLeft" @click="updateDetailShow">
            <img :src="playList[playListIndex].al.picUrl" alt="">
            <div>
                <p>{{playList[playListIndex].al.name}}</p>
                <span>滑动上下文可以切换哦</span>
            </div>
        </div>
        <div class="footerRight">
            <svg class="icon" aria-hidden="true" v-if="isbtnShow" @click="play">
                <use xlink:href="#icon-zanting4"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-else="isbtnShow" @click="play">
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gf-playlistMusic2"></use>
            </svg>
        </div>
        <!-- 必须是双引号里面写模板字符串 src解析时会将双引号去掉-->
        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`">
        </audio>
        <van-popup v-model:show="detailShow" position="right" :style="{ width: '100%',height:'100%' }">
            <MusicDetail :musicList='playList[playListIndex]' :play='play' :isbtnShow="isbtnShow"  :addDuration='addDuration'/>
        </van-popup>
    </div>
</template>
<script>
// store中的文件可以直接在各个组件中获取
// mapState相当于扩展运算符
// 通过mapState ,mapMutations 可以直接拿到store中的数据
import { mapState, mapMutations } from 'vuex'
import MusicDetail from '@/components/item/MusicDetail.vue'
export default {
    data() {
        return {
            interVal: 0
        }
    },
    computed: {
        // 遍历得到数据
        ...mapState(['playList', 'playListIndex', 'isbtnShow', 'detailShow'])
    },
    mounted() {
        console.log('refs'+this.$refs)
        // console.log('11'+this.$refs.audio)
        this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
        // this.updateTime()
    },
    updated() {
        // dom更新触发store中的getLyric函数
        this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
        this.addDuration()
    },
    methods: {
        play() {
            // 通过观察属性来判断调用哪个方法
            if (this.$refs.audio.paused) {
                // 设置函数可以实现音频播放
                this.$refs.audio.play()//播放
                // 播放状态下isbtnShow为false
                this.updateIsbtnShow(false)
                // console.log(this.$refs.audio.paused)
                // 播放触发定时器
                this.updateTime();
            }
            else {
                this.$refs.audio.pause();//暂停
                // 暂停状态下isbtnShow为true
                this.updateIsbtnShow(true)
                // console.log(this.$refs.audio.paused)
                // 暂停清除定时器
                clearInterval(this.interVal)
            }
        },
        addDuration(){
        this.updateDuration(this.$refs.audio.duration)
        },
        updateTime:function () {
            this.interVal = setInterval(() => {
                // console.log(99)
                this.updateCurrentTime(this.$refs.audio.currentTime)
            }, 1000)
        },
        // 遍历得到方法
        ...mapMutations(['updateIsbtnShow', 'updateDetailShow', 'updateCurrentTime','updateDuration']),
    },


    watch: {
        playListIndex() {
            // console.log(this.$refs.audio.paused)
            // 当index发生改变则让相应index的歌曲进行自动播放
            this.$refs.audio.autoplay = true
            // 一旦切换列表this.$refs.audio.paused就是true
            // 判断是否是暂停状态
            // this.$refs.audio.paused 破防情况下pasued为true
            if (this.$refs.audio.paused) {
                // 暂停状态改变暂停图标
                this.updateIsbtnShow(false)
            }
        },
        // 监听playList的改变
        playList() {
            if (this.isbtnShow) {
                this.$refs.audio.autoplay = true
                this.updateIsbtnShow(false)
            }
        }
    },
    components: {
        MusicDetail,
    }
}
</script>
<style lang="less" scoped>
.FooterMusic {
    width: 100%;
    height: 1.4rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    border-top: 1px solid gray;
    display: flex;
    padding: 0.2rem;
    justify-content: space-between;

    .footerLeft {
        width: 60%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
        }
    }

    .footerRight {
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .icon {
            width: .6rem;
            height: .6rem;
        }
    }

}
</style>