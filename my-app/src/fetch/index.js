import axios from 'axios/index';

let _fetch = axios.create({
    baseURL: 'http://localhost:8888',
    timeout:1000,
    headers:{'X-Auth':"foo"}
})
 axios.interceptors.request.use(function (config) {
     console.log(config);
     return config
 },function (error) {
     return Promise.reject(error)
 })


export default _fetch