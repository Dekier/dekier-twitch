export const state = () => ({
  followers: [],
  streamData: {}
})

export const getters = {
  followersData: state => state.followers,
  streamData: state => state.streamData
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
          }
        )
    })
  },
  setChannelData ({commit, dispatch, rootGetters}, requestData) {
    return new Promise((resolve, reject) => {
      dispatch('performRequest', {path: requestData.path, method: requestData.method, headers: {'Client-ID':  rootGetters['clientId'], 'Accept': 'application/vnd.twitchtv.v5+json'}}, {root: true})
        .then(
          data => {
            commit('assignChannelData', data)
          }
        )
    })
  }
}

export const mutations = {
  assignUsersData (state, data) {
    state.followers = data.users
  },
  assignChannelData (state, data) {
    state.streamData = data
  }
}