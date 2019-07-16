// 这个引入vuex自带的存储插件，会把我们的数据存储起来，
// 我们用的locastorage在读取的过程中要转换成字符串的时候是不能够在nodejs里面的，所以可以用这个插件实现

import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
        key: 'store',
    })(store)
  })
}