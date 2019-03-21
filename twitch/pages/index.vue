<template>
  <div class="container">
    <MainBackground />
    <MainCenterContainer/>
    <AddAppForUser
    :userTokenUrl="userTokenUrl"/>
  </div>
</template>

<script>
import MainBackground from '~/components/MainBackground.vue'
import MainCenterContainer from '~/components/MainCenterContainer.vue'
import AddAppForUser from '~/components/AddAppForUser.vue'

export default {
  components: {
    MainBackground,
    MainCenterContainer,
    AddAppForUser
  },

  data () {
    return {
      userTokenUrl: ''
    }
  },

  mounted () {
    this.userGetToken()
    this.checkUserToken()
  },

  computed: {
    token () {
      return this.$store.getters['token']
    },
    userToken () {
      return this.$store.getters['user/userToken']
    }
  },

  methods: {
    userGetToken () {
      var request = new XMLHttpRequest()
      var method = 'GET'
      var url = `https://id.twitch.tv/oauth2/authorize?client_id=${this.token}&redirect_uri=http://localhost:3000&response_type=code&scope=openid`
      var async = true
      request.open(method, url, async)
      request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
          this.userTokenUrl = request.responseURL
        }
      }
      request.send()
    },

    checkUserToken () {
      this.$store.dispatch('user/getUserTokenLocalStorage')
      .then(
        data => {
          if (this.$route.query && this.$route.query.code && !this.userToken) {
            this.$store.dispatch('user/setUserToken', this.$route.query.code)
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

