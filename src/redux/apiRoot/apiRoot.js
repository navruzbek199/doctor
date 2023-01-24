import axios from "axios"
const apiRoot = axios.create({
  baseURL: `http://ec2-43-206-161-114.ap-northeast-1.compute.amazonaws.com:8083/`
})
export default apiRoot