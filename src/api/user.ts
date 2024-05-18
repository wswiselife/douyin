import request from './index'

const getUserinfoApi = (params?:any,data?:any)=>{
    return request({url:'/v1/user/getUserinfo',method:"get",params,data})
}


export default {
    getUserinfoApi
}