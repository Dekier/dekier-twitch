export const state = () => ({
  userToken: ''
})

export const getters = {
  userToken: state => state.userToken
}

export const actions = {
    setUserToken ({commit}, data) {
      commit('setUserToken', data)
    },
    getUserTokenLocalStorage ({commit}) {
      commit('getUserTokenLocalStorage')
    },
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
  setUserToken (state, data) {
    state.userToken = data
    localStorage.setItem('userToken', data)
  },
  getUserTokenLocalStorage (state) {
    if (localStorage.getItem('userToken')) {
      state.userToken = localStorage.getItem('userToken')
    }
  }
  // lol (state, data) {
  //   console.log(data)
  // }
}

