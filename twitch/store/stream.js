export const state = () => ({
  followers: []
})

export const getters = {
  followersData: state => state.followers
}

export const actions = {
  setFollowers ({commit, dispatch, rootGetters}, requestData) {
    return new Promise((resolve, reject) => {
      dispatch('performRequest', {path: requestData.path, method: requestData.method, headers: {'Client-ID':  rootGetters['clientId']}}, {root: true})
        .then(
          response => {
            resolve(response)
          }
        )
    })
  },
  setUserData ({commit, dispatch, rootGetters}, requestData) {
    return new Promise((resolve, reject) => {
      dispatch('performRequest', {path: requestData.path, method: requestData.method, headers: {'Client-ID':  rootGetters['clientId'], 'Accept': 'application/vnd.twitchtv.v5+json'}}, {root: true})
        .then(
          data => {
            commit('assignUsersData', data)
            resolve(response)
          }
        )
    })
  }
}

export const mutations = {
  assignUsersData (state, data) {
    state.followers = data.users
    console.log(state.followers)
  }
}