// 封装axios请求
import axios from 'axios'
// axios实列
let service = axios.create({
        baseURL: 'http://localhost:3000',
        timeout: 3000,
    }
)
export default service