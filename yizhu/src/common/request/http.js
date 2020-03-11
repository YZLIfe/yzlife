import axios from 'axios'
import QS from 'qs'
axios.defaults.baseURL = 'https://api.yizhulife.com';
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
import store from '../../store/index'
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token        
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
        const token = store.state.token;
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)
axios.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
        // 否则的话抛出错误
        if (response.status == 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        if (error.response.status == 400) {
            let code = 400;
            return Promise.reject(code)
        }
    }
)
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err)
        })
    })
}
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err)
            })
    });
}