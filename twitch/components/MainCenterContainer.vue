<template>
  <div class="MainCenterContainer__main-container">
    <div class="MainCenterContainer__title-stream">
      {{mainUserData.title}}
    </div>
    <div class="MainCenterContainer__live-container">
      <iframe
      class="MainCenterContainer__live"
      allowfullscreen=true
      src="http://player.twitch.tv/?allowfullscreen&channel=Dekier&origin=http%3A%2F%2Flocalhost%3A3000"/>
      <iframe
        class="MainCenterContainer__live-chat"
        scrolling="true"
        id="Dekier"
        src="https://www.twitch.tv/embed/dekier/chat?darkpopout">
      </iframe>
    </div>
    <div class="MainCenterContainer__followers-title">
      Obserwujących: {{followersData.length}}  Na żywo: {{mainUserData.viewer_count}}
    </div>
    <div class="MainCenterContainer__followers-container">
      <carousel
      :adjustableHeight="true"
      :loop="true"
      :autoplay="false"
      :perPageCustom="[[768, 10], [1024, 1]]"
      :autoplayTimeout="2000">
          <slide
          v-for="user in followersData"
          :key="user.id"
          target="_blank"
          :href="`https://www.twitch.tv/${user.login}`"
          @mouseover="followerId = user.id"
          @mouseleave="followerId = 0"
          class="MainCenterContainer__follower"
          :style="userBackground(user)">
            <div
            v-if="followerId === user.id"
            class="MainCenterContainer__follower-name">
              {{ getUserName(user) }}
            </div>
          </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
import userStatus from '~/components/mixins/Userstatus.mixin.vue'

export default {
  name: 'MainCenterContainer',

  mixins: [userStatus],

  data () {
    return {
      followersData: [],
      usersData: [],
      followerId: 0
    }
  },

  mounted () {
    this.followers()
  },
  
  computed: {
    clientId () {
      return this.$store.getters['clientId']
    },
    userToken () {
      return this.$store.getters['user/userToken']
    },
    user_id () {
      return this.$store.getters['user_id']
    }
  },

  methods: {
    followers () {
      var request = new XMLHttpRequest()
      var method = 'GET'
      var url = `https://api.twitch.tv/helix/users/follows?to_id=${this.user_id}&first=100`
      var async = true
      request.open(method, url, async)
      request.setRequestHeader('Client-ID', this.clientId)
      request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
          var data = JSON.parse(request.responseText)
          this.followersData = data.data.map(u => {
            const data = {
              login: u.from_name,
              id: u.from_id
            }
            return data
          })
          this.getUserData()
          this.userStatus()
          // this.userStatus(this.followersData.map(f => f.id))
        }
      }
      request.send()
    },

    getUserData () {
      if (this.followersData.length) {
        let params = ''
        for (let i = 0; i < this.followersData.length; i++) {
          if (i === 0) {
            params += `${this.followersData[i].login}`
          } else {
             params += `,${this.followersData[i].login}`
          }
        }
        var request = new XMLHttpRequest()
        var method = 'GET'
        var url = `https://api.twitch.tv/kraken/users?login=${params}`
        var async = true
        request.open(method, url, async)
        request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
        request.setRequestHeader('Client-ID', this.clientId)
        request.onreadystatechange = () => {
          if (request.readyState === 4 && request.status === 200) {
            this.usersData = JSON.parse(request.responseText).users
            return this.usersData
          }
        }
        request.send()
      }
    },

    userBackground(data) {
      if (data) {
        const url = this.usersData.find(u => u._id === data.id)
        if (url && url.logo) {
        return {'background-image': `url(${url.logo})`}
        }
      }
    },

    getUserName (data) {
       if (data) {
        const user = this.usersData.find(u => u._id === data.id)
        if (user && user.name) {
          return user.name
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'MainCenterContainer';
</style>

