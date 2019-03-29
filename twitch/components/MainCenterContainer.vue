<template>
  <div class="MainCenterContainer__main-container">
    <div
    v-if="!userTokenData"
    @click="showAppForUser"
    class="MainCenterContainer__show-app-for-user">
      <svg
      class="AddAppForUser__icon-twitch"
      viewBox="0 0 128 134" width="14">
        <path d="M9 0L0 23v94h32v17h18l17-17h26l35-35V0H9zm107 76L96 96H64l-17 17V96H20V12h96v64zM96 35v35H84V35h12zm-32 0v35H52V35h12z" fill="#fff" fill-rule="evenodd"/>
      </svg>
        Połącz z Twitch
    </div>
    <div class="MainCenterContainer__title-stream">
      {{mainUserData.title}}
    </div>
    <div class="MainCenterContainer__live-container">
      <LoadingContent v-if="!(streamLoaded && chatLoaded)"/>
      <iframe
      class="MainCenterContainer__live"
      :class="{'MainCenterContainer__live--active': (streamLoaded && chatLoaded)}"
      allowfullscreen=true
      @load="streamLoaded = true"
      src="http://player.twitch.tv/?allowfullscreen&channel=Dekier&origin=http%3A%2F%2Flocalhost%3A3000"/>
      <iframe
        class="MainCenterContainer__live-chat"
        :class="{'MainCenterContainer__live-chat--active': (streamLoaded && chatLoaded)}"
        scrolling="true"
        id="Dekier"
        @load="chatLoaded = true"
        src="https://www.twitch.tv/embed/dekier/chat?darkpopout">
      </iframe>
    </div>
    <div class="MainCenterContainer__followers-title">
      Obserwujących: {{followersData.length}}  Na żywo: {{mainUserData.viewer_count}}
    </div>
    <div class="MainCenterContainer__followers-container">
      <div class="MainCenterContainer__scrollbar-line"/>
      <div class="MainCenterContainer__followers">
        <div
        v-for="user in followersData"
        :key="user._id"
        target="_blank"
        :href="`https://www.twitch.tv/${user.name}`"
        @mouseover="followerId = user._id"
        @mouseleave="followerId = 0"
        class="MainCenterContainer__follower"
        :style="userBackground(user)">
          <div
          v-if="followerId === user._id"
          class="MainCenterContainer__follower-name">
            {{ getUserName(user) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userStatus from '~/components/mixins/Userstatus.mixin.vue'
import LoadingContent from '~/components/LoadingContent.vue'

export default {
  name: 'MainCenterContainer',

  mixins: [userStatus],

  components: {
    LoadingContent
  },

  data () {
    return {
      usersData: [],
      followerId: 0,
      chatLoaded: false,
      streamLoaded: false
    }
  },

  mounted () {
    this.followers()
  },
  
  computed: {
    followersData () {
      return this.$store.getters['stream/followersData']
    },
    userToken () {
      return this.$store.getters['user/userToken']
    },
    user_id () {
      return this.$store.getters['user_id']
    },
    userTokenData () {
      return this.$store.getters['user/userTokenData']
    }
  },

  methods: {
    followers () {
      const data = {
        path: `https://api.twitch.tv/helix/users/follows?to_id=${this.user_id}&first=100`,
        method: 'GET'
      }
      this.$store.dispatch('stream/setFollowers', data)
      .then( response => {
          this.setUserData(response.data)
      })
    },

    setUserData (data) {
      if (data) {
        let params = ''
        for (let i = 0; i < data.length; i++) {
          if (i === 0) {
            params += `${data[i].from_name}`
          } else {
             params += `,${data[i].from_name}`
          }
        }

        const requestData = {
          path: `https://api.twitch.tv/kraken/users?login=${params}`,
          method: 'GET'
        }
        this.$store.dispatch('stream/setUserData', requestData)
      }
    },

    userBackground(data) {
      if (data) {
        return {'background-image': `url(${data.logo})`}
      }
    },

    getUserName (data) {
      if (data) {
        return data.name
      }
    },
    showAppForUser () {
      this.$emit('showAppForUser')
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'MainCenterContainer';
</style>

