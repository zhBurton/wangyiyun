import {
  createStore
} from 'vuex'
import {
  getMusicLyric
} from '@/request/api/item.js'
import { getPhoneLogin } from '@/request/api/home'
export default createStore({
  state: {
    playList: [{
      al: {
        id: 35559257,
        name: "再也没有",
        pic: 18771962022944664,
        picUrl: "https://p2.music.126.net/B7MRU9cieODaInnwzyLwYQ==/18771962022944662.jpg",
        pic_str: "18771962022944662"
      },
      // 这个id和上面那个id不同，这个才是播放音乐的id 上面那个id是专辑信息不是歌曲信息
      id: 480580003,
      ar: [{
        name: "永彬Ryan.B"
      }]
    }],
    playListIndex: 0, //播放列表默认下标为0
    isbtnShow: true, //播放按钮的显示
    detailShow: false, //弹出层设置 歌曲详情页的设置
    lyricList: {}, //保存的是歌词
    currentTime: 0, //当前时间
    duration:0,//歌曲总时长
    isLogin:false,//判断是否登陆
    isFooterMusic:true,//是否显示底部组件
    tooken:'',//保存的字符串证明你登陆成功
    user:{},//用户数据
  },
  getters: {},
  // 书写方法
  mutations: {
    // 第二个参数才是传入的参数
    // 传入数据改变是否进行播放 第二个参数才是传入的参数 第一个参数是state
    updateIsbtnShow(state, value) {
      state.isbtnShow = value
    },
    pushPlayList:function(state,value){
    state.playList.push(value)
    },
    updatePlayList(state, value) {
      state.playList = value;
      // cvalue是传入的数据
      console.log(state.playList)
    },
    // 更改数组的索引
    updatePlayListIndex(state, index) {
      state.playListIndex = index
    },
    updateDetailShow(state) {
      state.detailShow = !state.detailShow
    },
    // 改变歌词
    updateLyricList(state, value) {
      // console.log(value)
      state.lyricList = value
    },
    updateCurrentTime(state, value) {
      // console.log(state.currentTime)
      state.currentTime = value
    },
    // 传入歌曲总时长
    updateDuration(state,value){
    state.duration=value;
    },
    // 更改
    updateIsLogin(){
    state.isLogin=true
    },
    updateToken(state,value){
    state.tooken=value
    localStorage.setItem('token',state.tooken)
    },
    // 通过函数获取用户数据
    updateUser(state,value){
    state.user=value
    }
  },
  // 异步请求写在actions中
  actions: {
    getLyric: async function (context, value) {
      let res = await getMusicLyric(value)
      // console.log("res" + res)
      context.commit('updateLyricList', res.data.lrc)
    },
    getLogin:async function(context,value){
    let res=await getPhoneLogin(value)
    return res
    }

  },
  modules: {}
})