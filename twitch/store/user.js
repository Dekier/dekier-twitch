import { resolve } from "url";

export const state = () => ({
  userCode: '',
  userTokenData: null
})


export const getters = {
  userCode: state => state.userCode,
  userTokenData: state => state.userTokenData
}

export const actions = {
    setUserCode ({commit}, data) {
      commit('setUserCode', data)
    },
    setUserToken ({commit}, data) {
      commit('assignUserTokenLocalStorage', data)
    },
    getUserCodeLocalStorage ({commit}) {
      commit('getUserCodeLocalStorage')
    },
    getUserTokenData ({commit}) {
      commit('getUserTokenData')
    }
}


export const mutations = {
  setUserCode (state, data) {
    state.userCode = data
  },
  assignUserTokenLocalStorage (state, data) {
    state.userTokenData = data
    localStorage.setItem('userTokenData', JSON.stringify(state.userTokenData))
  },
  getUserCodeLocalStorage (state) {
    if (localStorage.getItem('userCode')) {
      state.userCode = localStorage.getItem('userCode')
    }
  },
  getUserTokenData (state) {
    if (localStorage.getItem('userTokenData')) {
      state.userTokenData = JSON.parse(JSON.parse(localStorage.getItem('userTokenData')))
    }
  }
}

