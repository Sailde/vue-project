import {login, logout, getInfo} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'
import {resetRouter} from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  async login({commit}, userInfo) {
    const {username, password} = userInfo
    let result = await login({username: username.trim(), password: password})
    // console.log(result)
    if (result.code === 20000) {
      commit('SET_TOKEN', result.data.token)
      setToken(result.data.token)
      return "OK";
    } else {
      return new Promise.reject(new Error("faile"))
    }
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // get user info
  async getInfo({commit, state}) {
    let resolve = await getInfo(state.token)
    // console.log(resolve)
    if (resolve.code === 20000) {
      const {data} = resolve

      if (!data) {
        return new Promise.reject(new Error('Verification failed, please Login again.'))
      }

      const {name, avatar} = data

      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      return data
    } else {
      return new Promise.reject(new Error("faile"))
    }

    // return new Promise((resolve, reject) => {
    //   getInfo(state.token).then(response => {
    //     const {data} = response
    //
    //     if (!data) {
    //       return reject('Verification failed, please Login again.')
    //     }
    //
    //     const {name, avatar} = data
    //
    //     commit('SET_NAME', name)
    //     commit('SET_AVATAR', avatar)
    //     resolve(data)
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // user logout
  async logout({commit, state}) {
    let resolve = await logout(state.token)
    // console.log(resolve)
    if (resolve.code === 20000) {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      return resolve
    } else {
      return new Promise.reject(new Error("退出失败！"))
    }
    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
    //     removeToken() // must remove  token  first
    //     resetRouter()
    //     commit('RESET_STATE')
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // remove token
  async resetToken({commit}) {
    let resolve = await removeToken()
    // console.log(resolve)
    if (resolve.code === 20000) {
      commit('RESET_STATE')
      return resolve
    }
    //   return new Promise(resolve => {
    //     removeToken() // must remove  token  first
    //     commit('RESET_STATE')
    //     resolve()
    //   })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

