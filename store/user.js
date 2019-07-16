import {mapState,mapMutations} from "vuex"
// 使用vuex新建一个store仓库，这个仓库存储数据，其他组件要使用就掉用它
// 在我们登录成功之后，后台返回的数据我们要存在头部渲染出来
export const state =()=> {
    return{
         userInfo:{
        token:"",
        user:{
            nickname:"abc123"
        }
    }//这里我们是把要在头部渲染的数据用vuex里面的state把它存起来，头部要用的话就直接通过this.$store.state拿
    }
   
}
export const mutations= {
    // 设置用户数据
    setUserInfo(state,data){
        state.userInfo=data
    },
    //设置清空用户数据
    clearUserInfo(state){
        state.userInfo={
            token:"",
            user:{} 
        }
    }
}
export const actions= {
    //这里因为我们的页面有时候是不止一个页面要用到登录的，所以我们可以用vuex里面actions里面的异步函数把它封装，谁要用的话直接调用
    login({commit},data){
        this.$axios({
            url:'/accounts/login',
            method:"POST",
            data,
          }).then(res=>{
            // console.log(res)
            commit("setUserInfo",res.data)//把数据设置保存在头部登录状态，但是当我们刷新之后，数据会丢失，所以我们要把它存储起来
            
          })
    },
    register({commit},data){
        this.$axios({
            url:`/accounts/register`,
            method:'POST',
            data:data
          }).then(res=>{
            // console.log(res)
            commit("setUserInfo",res.data)
            this.$router.back();
          })
    }
}