import axios from 'axios'

export const state = () => ({
  clientId: 'yialthhqwtvr06wfcas0fnzcpvne3x',
  user_id: '226325627',
  clientSecret: 'xmlpu2tlnr5v7q5xv2l93bz619lhj3'
})

export const getters = {
  clientId: state => state.clientId,
  user_id: state => state.user_id,
  clientSecret: state => state.clientSecret
}

export const actions = {
  performRequest ({state}, data) {
    const reqData = {
      method: data.method,
      url: `${data.path}`,
      data: data.data,
      params: data.params
    }

    const headers = { }

    if (data.headers) {
      Object.assign(headers, data.headers)
    }

    Object.assign(reqData, {headers})

    return axios(reqData)
      .then(resp => {
        return resp.data
      })
      .catch(error => Promise.reject(error))
  },
  performAuthorizedRequest ({state, commit, dispatch, getters}, data) {
    const reqData = {
      method: data.method,
      url: `${data.path}`,
      data: data.data,
      params: data.params
    }
    const headers = { }
    const token = getters['user/token']
    if (data.headers) {
      Object.assign(headers, data.headers)
    }

    if (token) {
      Object.assign(headers, {'X-Auth-Token': token})
    }

    Object.assign(reqData, {headers})

    return axios(reqData)
      .then(resp => resp.data)
      .catch(error => {
        if (error.request.status === 401) {
          dispatch('user/clearUserData')
        }
        return Promise.reject(error)
      })
  }
}