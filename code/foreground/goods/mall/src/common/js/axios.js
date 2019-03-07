import axios from 'axios'
import qs from 'qs'
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;
axios.defaults.timeout = 60000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = '';
//POST传参序列化
axios.interceptors.request.use((config) => {
  if(config.method  === 'post'&& config.data!==undefined && config.data.constructor !== FormData){
    if(Object.prototype.toString.call(config.data) === '[object Object]'){
      config.data = qs.stringify(config.data)
    };
  }
  return config;
},(error) =>{
   //console.log("错误的传参");
  return Promise.reject(error);
});
//code状态码200判断
axios.interceptors.response.use((res) =>{
  if(res.status != '200'){
    //console.log(res.statusText);
    return Promise.reject(res);
  }
  return res;
}, function axiosRetryInterceptor(err) {
    var config = err.config;
    // If config does not exist or the retry option is not set, reject
    if(!config || !config.retry) return Promise.reject(err);
    
    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;
    
    // Check if we've maxed out the total number of retries
    if(config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
    }
    
    // Increase the retry count
    config.__retryCount += 1;
    
    // Create new promise to handle exponential backoff
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });
    
    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
        return axios(config);
    });
});
export default axios;