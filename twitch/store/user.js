import { resolve } from "url";

export const state = () => ({
  userCode: '',
  userTokenData: {}
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
  // getArticleGroups ({dispatch, commit}) {
  //   return dispatch('performRequest', {path: `article_groups`, method: 'get'}, {root: true})
  //     .then(
  //       data => {
  //         commit('lol', data)
  //       }
  //     )
  // }
}


export const mutations = {
  setUserCode (state, data) {
    state.userCode = data
    // localStorage.setItem('userToken', data)
  },
  assignUserTokenLocalStorage (state, data) {
    state.userTokenData = data
    localStorage.setItem('userTokenData', JSON.stringify(state.userTokenData))
    console.log(state.userTokenData)
  },
  getUserCodeLocalStorage (state) {
    if (localStorage.getItem('userCode')) {
      state.userCode = localStorage.getItem('userCode')
    }
  },
  getUserTokenData () {
    if (localStorage.getItem('userTokenData')) {
      state.userTokenData = JSON.parse(localStorage.getItem('userTokenData'))
      console.log(state.userTokenData)
    }
  }
  // lol (state, data) {
  //   console.log(data)
  // }
}

