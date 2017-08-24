/**
 * Created by yuanxiaogang on 2017/8/23.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
  }
})
