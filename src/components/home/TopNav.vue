<template lang="">
    <div class="topNav">
        <div class="topleft">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gengduo3"></use>
            </svg>
        </div>
        <div class="topContent">
            <span @click="$router.push('/infoUser')">我的</span>
            <span class="active">发现</span>
            <span>云村</span>
            <span>图标</span>
        </div>
        <div class="topRight">
            <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>
    </div>
</template>
<style lang="less" scoped>
    /* 设置top布局 */
    .topNav {
        width: 100%;
        height: 1rem;
        padding: .2rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    /* 头部字体 */
    .topNav .topContent {
        width: 65%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        font-size: .36rem;
    }
    .topNav .topContent .active {
        font-weight: 900;
    }
</style>>