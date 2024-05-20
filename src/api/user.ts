import request from './index'

const getUserInfoApi = (params?:any,data?:any)=>{
    return request({url:'/v1/user/getUserInfo',method:"get",params,data})
}

const updateUserInfoApi = (params?:any,data?:any)=>{
    return request({
        url:'/v1/user/updateUserInfo',
        method:'post',
        params,
        data
    })
}


export default {
    getUserInfoApi,
    updateUserInfoApi
}