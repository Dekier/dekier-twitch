<template>
  <div class="MainCenterContainer__main-container">
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
      Obserwujących: {{followersData.length}}
    </div>
    <div class="MainCenterContainer__followers-container">
      <div class="MainCenterContainer__followers">
        <a
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
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainCenterContainer',

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
    token () {
      return this.$store.getters['token']
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
      request.setRequestHeader('Client-ID', this.token)
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
        }
      }
      request.send()
    },
    getUserData () {
      if (this.followersData.length) {
        let params = ''
        for (let i = 0; i < this.followersData.length; i++) {
          if (i === 0) {
            params += `login=${this.followersData[i].login}`
          } else {
             params += `&login=${this.followersData[i].login}`
          }
        }
        var request = new XMLHttpRequest()
        var method = 'GET'
        var url = `https://api.twitch.tv/helix/users?${params}`
        var async = true
        request.open(method, url, async)
        request.setRequestHeader('Client-ID', this.token)
        request.onreadystatechange = () => {
          if (request.readyState === 4 && request.status === 200) {
            this.usersData = JSON.parse(request.responseText).data
            return this.usersData
          }
        }
        request.send()
      }
    },

    userBackground(data) {
      if (data) {
        const url = this.usersData.find(u => u.id === data.id)
        if (url && url.profile_image_url) {
        return {'background-image': `url(${url.profile_image_url})`}
        }
      }
    },

    getUserName (data) {
       if (data) {
        const user = this.usersData.find(u => u.id === data.id)
        if (user && user.login) {
          return user.login
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'MainCenterContainer';
</style>

