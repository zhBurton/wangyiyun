import service from '..'
// 获取首页轮播图的数据
export function getBanner() {
    // 因为service是axios的实例 所以可以直接使用service({})进行传参
    return service({
        method: "GET",
        url: "/banner?type=2",
    })
}
// 获取推荐好歌单 的方法
export  function getMusicList() {
    return service({
        method: 'get',
        // 返回10条数据
        url: '/personalized?limit=10'
    })
}
// 搜索功能
export  function getSearchMusic(data) {
    return service({
        method: 'get',
        // 返回10条数据
        url: `/search?keywords=${data}`
    })
}
// 登陆
export  function getPhoneLogin(data) {
    return service({
        method: 'get',
        // 返回10条数据
        url: `/login/cellphone?phone=${data.phone}&password=${data.password}`
    })
}
// 用户详情
// /user/detail?uid=32953014
export  function getLoginUser(data) {
    return service({
        method: 'get',
        // 返回10条数据
        url:`user/detail?uid=${data}`
    })
}