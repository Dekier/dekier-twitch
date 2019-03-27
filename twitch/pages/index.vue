<template>
  <div class="container">
    <LoadingContent/>
    <MainBackground/>
    <MainCenterContainer
    @showAppForUser="showAppForUser"
    v-if="!activeAddAppDropdown"/>
    <AddAppForUser
    v-if="activeAddAppDropdown"
    :userCodeUrl="userCodeUrl"
    @withoutLogin="withoutLogin"/>
  </div>
</template>

<script>
import MainBackground from '~/components/MainBackground.vue'
import MainCenterContainer from '~/components/MainCenterContainer.vue'
import AddAppForUser from '~/components/AddAppForUser.vue'
import LoadingContent from '~/components/LoadingContent.vue'

export default {
  components: {
    MainBackground,
    MainCenterContainer,
    AddAppForUser,
    LoadingContent
  },

  data () {
    return {
      userCodeUrl: '',
      activeAddAppDropdown: true
    }
  },

  mounted () {
    this.getUserTokenData()
    this.getUserCode()
    this.checkUserCode()
  },

  computed: {
    clientId () {
      return this.$store.getters['clientId']
    },
    clientSecret () {
      return this.$store.getters['clientSecret']
    },
    userTokenData () {
      return this.$store.getters['user/userTokenData']
    }
  },

  methods: {
    getUserTokenData () {
      this.$store.dispatch('user/getUserTokenData')
      .then(
        data => {
          console.log(this.$store.getters['user/userTokenData'])
        }
      )
    },
    getUserCode () {
      var request = new XMLHttpRequest()
      var method = 'GET'
      var url = `https://id.twitch.tv/oauth2/authorize?client_id=${this.clientId}&redirect_uri=http://localhost:3000&response_type=code&scope=openid&state=siematumarcin`
      var async = true
      request.open(method, url, async)
      request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
          this.userCodeUrl = request.responseURL
        }
      }
      request.send()
    },
    checkUserCode () {
      this.$store.dispatch('user/getUserCodeLocalStorage')
      .then(
        data => {
          if (this.$route.query && this.$route.query.code) {
            this.getUserToken( this.$route.query.code)
          }
        }
      )
    },
    getUserToken (code) {
      var request = new XMLHttpRequest()
      var method = 'POST'
      var url = `https://id.twitch.tv/oauth2/token?client_id=${this.clientId}&client_secret=${this.clientSecret}&code=${code}&grant_type=authorization_code&redirect_uri=http://localhost:3000`
      var async = true
      request.open(method, url, async)
      request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
          const userTokenData = request.response
          this.$store.dispatch('user/setUserToken', userTokenData)
        }
      }
      request.send()
    },
    withoutLogin () {
      this.activeAddAppDropdown = false
    },
    showAppForUser () {
      this.activeAddAppDropdown = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

