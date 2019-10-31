
import axios from 'axios'

export function request(config) {
  const estimate = axios.create({
    method:"get",
    baseURL: 'http://123.207.32.32:8000',
    timeout:5000,
  })
  return estimate(config);
  // instance1({
  //   url:'/home/multidata'
  // })
  //   .then(res => {
  //     console.log(res);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
}