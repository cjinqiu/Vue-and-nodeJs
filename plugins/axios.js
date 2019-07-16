import {Message} from "element-ui";
export default ({$axios})=>{
    // console.log(nuxt)
    // 请求错误信息拦截器、
    $axios.onError(err=>{
        const {statusCode,message}=err.response.data
        if(statusCode===400){
            Message.error(message)
            // redirect: ('user/login')
        }
    })
    // console.log(nuxt,1424)
}