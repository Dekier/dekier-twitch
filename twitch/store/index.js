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