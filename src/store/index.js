import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
export default new Vuex.Store({
  state:{
    userInfo: {},  // 当前用户信息
    teacherLists : []   //教师信息列表
  },
  // 对state数据进行同步修改
  mutations:{
    SET_USERINFO(state,userInfo){
      state.userInfo = userInfo;
    },
    SET_TEACHERLISTS(state,teacherLists){
      state.teacherLists = teacherLists;
    }
  },
  // 异步修改
  actions:{
  },
  // 对state数据进行操作，例如vue中的computed：计算属性
  getters:{
    userInfo(state) {
      return state.userInfo
    },
    teacherLists(state){
      return state.teacherLists
    }
  },

})
