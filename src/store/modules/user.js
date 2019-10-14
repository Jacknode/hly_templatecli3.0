import {
  login
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const data = response.data
          if (Number(data.resultcode) == 200) {
            // setToken(data.token)
            // commit('SET_TOKEN', data.token)
            sessionStorage.setItem('admin', JSON.stringify(data.data))
            resolve(data.data)
          } else {
            reject(data.resultcontent)
          }

        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default user