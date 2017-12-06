import Vue from 'vue'
import axios from 'axios'
Vue.prototype.axios = axios;

//axios.defaults.baseURL = 'http://localhost:8080/static/json';

axios.interceptors.request.use(function (config) {
    // Do something before request is sent 
    return config;
}, function (error) {
    // Do something with request error 
    return Promise.reject(error);
});
 
// Add a response interceptor 
axios.interceptors.response.use(function (response) {
    // Do something with response data 
    return response;
}, function (error) {
    // Do something with response error 
    return Promise.reject(error);
});


export default axios;
