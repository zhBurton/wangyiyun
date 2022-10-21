<template>
    <img :src="musicList.al.picUrl" alt=" " class='bgimg'>
    <div class="detailTop">
        <div class="detailTopLeft">
            <svg class="icon" aria-hidden="true" @click="backHome">
                <use xlink:href="#icon-xiangzuo4"></use>
            </svg>
            <div class="leftMarquee">
                <!-- 歌曲名称 -->
                <!-- al是专辑的名称 -->
                <!-- 第三方组件跑马灯的效果 -->
                <Vue3Marquee style="color:#fff;">{{musicList.al.name}}</Vue3Marquee>
                <!-- 作者名称 -->
                <span v-for="(item,index) in musicList.ar" :key="index">{{item.name}}
                </span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou1"></use>
                </svg>
            </div>
        </div>
        <div class="detailTopRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
        </div>
    </div>
    <!-- 详情页中间部分 -->
    <div class="detailContent" v-show="!isLyricShow">
        <!-- 注意 这个地方的class是动态的值根据isbtnShow来判断是否有img_needle_active类 -->
        <img src="@/assets/磁针.png" alt="" class="img_needle" :class="{img_needle_active:!isbtnShow}">
        <img src="@/assets/磁盘.png" alt="" class="img_cd">
        <img :src="musicList.al.picUrl" alt="" class="img_ar"
            :class="{img_ar_active:!isbtnShow,img_ar_pauesd:isbtnShow}" @click="isLyricShow=true">
    </div>
    <!-- 歌词部分 -->
    <div class="musicLyric" ref="musicLyric" v-show="isLyricShow">
        <p v-for="item in lyric" :key="item"
            :class="{active:(currentTime*1000>=item.time&&currentTime*1000<=item.pre)}">
            {{item.lrc}}
        </p>
    </div>
    <div class="detailFooter">
        <div class="footerTop">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-aixin"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiazai1"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-double-circle"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao-"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yinle"></use>
            </svg>
        </div>
        <div class="footerContent">
            <!-- 显示进度条 -->
            <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">

        </div>
        <div class="footer">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xunhuan"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
                <use xlink:href="#icon-zuobofang"></use>
            </svg>
            <!-- 暂停 -->
            <svg class="icon" aria-hidden="true" @click="play" v-if="isbtnShow">
                <use xlink:href="#icon-zanting4"></use>
            </svg>
            <!-- 显示 -->
            <svg class="icon" aria-hidden="true" @click="play" v-else="isbtnShow">
                <use xlink:href="#icon-zanting1"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="goPlay(1)">
                <use xlink:href="#icon-youbofang"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofangliebiao"></use>
            </svg>
        </div>
    </div>
</template>
<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations, mapState } from 'vuex';
export default {
    data() {
        return {
            isLyricShow: false,
        }
    },
    computed: {
        ...mapState(['lyricList', 'currentTime', 'playListIndex', 'playList', 'duration']),
        lyric: function () {
            let arr;
            if (this.lyricList.lyric) {
                arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
                    let min = item.slice(1, 3);
                    let sec = item.slice(4, 6);
                    let mill = item.slice(7, 10);
                    let lrc = item.slice(11, item.length)
                    let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
                    if (isNaN(Number(mill))) {
                        mill = item.slice(7, 9);
                        lrc = item.slice(10, item.length)
                        time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
                    }
                    return { min, sec, mill, lrc, time };
                })
                // arr是一个数组，但是item是一个对象
                arr.forEach((item, i) => {
                    if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
                        item.pre = 1000000000
                    }
                    else {
                        item.pre = arr[i + 1].time
                    }
                });
            }
            // console.log(arr)
            return arr;
        },
    },
    mounted() {
        // 点击固定部分的播放按钮 传入的数据
        // console.log(this.musicList)
        // 展示的是传入的歌词
        // console.log(this.lyricList.lyric);
        this.addDuration()
    },
    props: ['musicList', 'play', 'isbtnShow', 'addDuration'],
    methods: {
        ...mapMutations(['updateDetailShow', 'updatePlayListIndex']),
        backHome() {
            this.updateDetailShow(),
                this.isLyricShow = false
        },
        goPlay(num) {
            let index = this.playListIndex + num
            if (index < 0) {
                index = this.playList.length - 1
            }
            else if (index == this.playList.length) {
                index = 0
            }
            this.updatePlayListIndex(index)
        },
    },
    watch: {
        currentTime: function (newValue) {
            let p = document.querySelector('p.active')
            // console.log([p])
            // 设置滚动条的滚动
            if (p) {
                if (p.offsetTop > 300) {
                    this.$refs.musicLyric.scrollTop = p.offsetTop - 300
                }
            }
            if (newValue === this.duration) {
                if (this.playListIndex === this.playList.length - 1) {
                    this.updatePlayListIndex(0)
                    this.play()
                }
                else {
                    this.updatePlayListIndex(this.playListIndex + 1)
                }
            }
        }
    },
    components: {
        Vue3Marquee,
    }
}
</script>
<style lang="less" scoped>
.bgimg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(70px);
}

.detailTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    padding: 0.2rem;
    align-items: center;
    // color: #fff;
    fill: #fff;

    .detailTopLeft {
        display: flex;
        align-items: center;

        .leftMarquee {
            width: 3rem;
            height: 100%;
            margin-left: 0.4rem;

            span {
                color: rgb(192, 190, 190);
            }

            .icon {
                width: 0.3rem;
                height: 0.3rem;
                fill: rgb(192, 190, 190);

            }
        }
    }
}

.detailContent {
    width: 100%;
    height: 9rem;
    display: flex;
    // border: 1px solid red;
    flex-direction: column;
    align-items: center;
    position: relative;

    // 磁针
    .img_needle {
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(-12deg);
        transition: all 2s;
    }

    .img_needle_active {
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(0deg);
        transition: all 2s;
    }

    // 磁盘
    .img_cd {
        width: 5rem;
        height: 5rem;
        position: absolute;
        bottom: 2.3rem;
        z-index: -1;
    }

    // 图片
    .img_ar {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        position: absolute;
        bottom: 3.14rem;
        animation: rotate_ar 10s linear infinite;
    }

    .img_ar_active {
        animation-play-state: running;
    }

    .img_ar_pauesd {
        animation-play-state: paused;
    }

    @keyframes rotate_ar {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
}

.musicLyric {
    width: 100%;
    height: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: .2rem;
    overflow: auto;

    // border: 1px solid red;
    p {
        color: rgb(233, 229, 229);
        margin-bottom: .4rem;
    }

    .active {
        color: rgb(12, 234, 127);
        font-size: .4rem
    }
}

// 底部
.detailFooter {
    width: 100%;
    height: 3rem;
    position: absolute;
    bottom: 0.2rem;
    display: flex;
    flex-direction: column;
    // border: 1px solid red;
    justify-content: space-between;

    .footerTop {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .icon {
            width: 0.6rem;
            height: 0.6rem;
            fill: rgb(245, 234, 234);
        }
    }

    .range {
        width: 100%;
        height: 0.06rem;
    }

    .footer {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .icon {
            width: 0.6rem;
            height: 0.6rem;
            fill: rgb(245, 234, 234);
        }
    }
}
</style>