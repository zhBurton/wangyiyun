<template>
    <!-- 歌单列表的获取页面 -->
    <div class="itemMusicList">
        <div class="itemListTop">
            <div class="listLeft">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zanting4"></use>
                </svg>
                <span>播放全部<span>(共{{}})</span></span>
            </div>
            <div class="listRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiahao"></use>
                </svg>
                <span>收藏({{subscribedCount}})</span>
            </div>
        </div>
        <div class="itemList">
            <div class="item" v-for="(item,i) in itemList.songs" :key="i">
                <div class="itemLeft" @click="playMusic(i)">
                    <span class="leftSpan">{{i+1}}</span>
                    <div>
                        <p class="name">{{item.al.name}}</p>
                        <span v-for="(item1,index) in item.ar" :key="index">
                            {{item1.name}}
                        </span>
                    </div>
                </div>
                <div class="itemRight">
                    <svg class="icon" aria-hidden="true" v-show="item.mv">
                        <use xlink:href="#icon-bofangcishu"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-gengduo3"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import { mapMutations } from 'vuex';

export default {
    setup(props) {
        // console.log(props)
    },
    props: ['itemList', 'subscribedCount'],
    methods: {
        playMusic(i) {
            // 传过去的是一个歌单数组 不能直接传入itemList
            this.updatePlayList(this.itemList.songs)
            this.updatePlayListIndex(i)
        },
        // 遍历得到方法
        ...mapMutations(['updatePlayList','updatePlayListIndex'])
    }
}
</script>
<style lang="less" scoped>
.itemMusicList {
    width: 100%;
    height: 10rem;
    background-color: #fff;
    padding: 0 .3rem;
    border-top-left-radius: .3rem;
    border-top-right-radius: .3rem;

    .itemListTop {
        display: flex;
        width: 100%;
        height: 1rem;
        justify-content: space-between;
        // border: 1px solid blue;
        align-items: center;

        .listLeft {
            width: 3rem;
            height: 100%;
            display: flex;
            align-items: center;

            // 边框只是为了
            // border: 1px solid red;
            span {
                margin-left: .15rem;
                font-weight: 700;

                span {
                    margin-left: 0;
                    font-weight: 400;
                    font-size: .0024rem;
                }
            }
        }

        .listRight {
            height: 100%;
            padding: .2rem;
            display: flex;
            border-radius: .4rem;
            align-items: center;
            background-color: red;
            color: #fff;

            .icon {
                width: 0.3rem;
                height: 0.3rem;
                fill: #fff;
            }
        }
    }

    .itemList {
        height: 100%;

        .item {
            display: flex;
            height: 1.4rem;
            justify-content: space-between;
            // border: 1px solid red;
            align-items: center;

            .itemLeft {
                width: 85%;
                display: flex;
                // border: 1px solid red;
                align-items: center;
                font-weight: 100;
                color: #999;

                .leftSpan {
                    padding-right: .2rem;
                }

                .name {
                    color: black;
                    font-weight: 900;
                }
            }

            .itemRight {
                // width:15%;
                height: 100%;
                // border: 1px solid blue;
                display: flex;
                align-items: center;
                margin: 0 .2rem;

                .icon {
                    fill: rgb(199, 198, 198);
                    margin: 10px;
                }
            }
        }
    }


}
</style>