/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2018-09-05 11:10:45
 * @LastEditTime: 2019-10-14 10:58:25
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'
import tagsView from './modules/tagsView'
import admin from './admin'



const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    permission,
    app,
    admin,
    tagsView,
    user
  },
  getters
});

export default store