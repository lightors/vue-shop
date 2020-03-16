import axios from 'axios'

export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/wh',
   // baseURL: 'http://106.54.54.237:8000/api/wh',
    timeout: 10000
  })

  //2.axios的拦截器

  //axios.interceptors  全局拦截

  /*  instance.interceptors.request.use(config =>{
      console.log(config);
      return config
    },err => {
      console.log(err);
    })*/
  instance.interceptors.response.use(res => {
    //console.log(res);
    return res.data
  }, err => {
    console.log(err);
  })


//发送真正的网络请求
  return instance(config)
}

