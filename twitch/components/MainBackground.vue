<template>
  <div class="MainBackground__main-container">
    <div class="MainBackground__big-balt">
      <div
      :class="{'MainBackground__middle-balt--offline': mainUserData.type !== 'live'}"
      class="MainBackground__middle-balt"/>
      <div
      :class="{'MainBackground__small-balt--offline': mainUserData.type !== 'live'}"
      class="MainBackground__small-balt"/>
    </div>
    <div class="MainBackground__big-balt">
      <div
      :class="{'MainBackground__small-balt--offline': mainUserData.type !== 'live'}"
      class="MainBackground__small-balt"/>
    </div>
    <div class="MainBackground__big-balt">
      <div
      :class="{'MainBackground__middle-balt--offline': mainUserData.type !== 'live'}"
      class="MainBackground__middle-balt"/>
      <div
      :class="{'MainBackground__small-balt--offline': mainUserData.type !== 'live'}"
      class="MainBackground__small-balt"/>
    </div>
  </div>
</template>

<script>
import userStatus from '~/components/mixins/Userstatus.mixin.vue'

export default {
  name: 'MainBackground',

  mixins: [userStatus],

  mounted () {
    this.userStatus(['Dekier'])
  },

  computed: {
    clientId () {
      return this.$store.getters['clientId']
    }
  },

  methods: {
    // streamData () {
    //   var request = new XMLHttpRequest()
    //   var method = 'GET'
    //   var url = `https://id.twitch.tv/oauth2/authorize?client_id=${this.clientId}&redirect_uri=http://localhost:3000&response_type=code&scope=openid`
    //   var async = true
    //   request.open(method, url, async)
    //   // request.setRequestHeader('Client-ID', this.clientId)
    //   request.onreadystatechange = () => {
    //     if (request.readyState === 4 && request.status === 200) {
    //       console.log(request.responseURL)
         
    //     }
    //   }
    //   request.send()
    // }
  }
}
</script>

<style lang="scss" scoped>
  @import 'MainBackground';
</style>

