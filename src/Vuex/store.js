import Vue from 'vue'
import Vuex from 'vuex'
import comInfo from './modules/comInfo'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    comInfo: comInfo,
  },
  strict: debug
})
