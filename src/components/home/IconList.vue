<template>
    <div class="iconList">
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-meirituijian"></use>
            </svg>
            <span>每日推荐</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zanting_"></use>
            </svg>
            <span>私人FM</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gedan"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-paihangbang1"></use>
            </svg>
            <span>排行榜</span>
        </div>
    </div>
</template>
<style scoped>
    .iconList {
        width: 100%;
        height: 2rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 0.2rem;
    }

    .iconItem {
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        /* 表示每一项在侧轴的位置 */
        align-items: center;
    }

    .icon {
        width: 1rem;
        height: 1rem;

    }
</style>