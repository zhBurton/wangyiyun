import {
    Swipe,
    SwipeItem,
    Button,
    Popup
} from 'vant';
// 引入vant的文件放入数组中
let plugins = [
    Swipe, SwipeItem, Button,Popup
]
// 封装一个函数功能是循环use引入文件
export default function getVant(app) {
    plugins.filter((item) => {
        return app.use(item)
    })
}