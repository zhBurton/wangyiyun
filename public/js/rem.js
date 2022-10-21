function remSize() {
    // 实现rem布局  （谁着窗口的改变页面也会跟着适配改变）
    // 获取设备窗口的大小
    var daviceWidth = document.documentElement.clientWidth || window.innerWidth;
    if (daviceWidth >= 750) {
        daviceWidth = 750
    }
    if (daviceWidth <= 320) {
        daviceWidth = 320
    }
    // 设置html的1rem为多少px 
    // 750px=>1rem 100px  375px=>1rem 50px
    document.documentElement.style.fontSize = (daviceWidth / 7.5) + 'px'
    // body的font-size为15px
    document.querySelector('body').style.fontSize = 0.3 + 'rem'
}
remSize()//当设备改变时固定设备的html中的font-size大小
// 当窗口大小改变时调用
window.onresize = function () {
    remSize()
}