<template>
  <div id="up" class="MainCenterContainer__main-container">
    <div class="MainCenterContainer__title">
      Wasza Aplikacja
    </div>
    <div
      v-if="!userTokenData"
      @click="showAppForUser"
      class="MainCenterContainer__show-app-for-user"
    >
      <svg class="AddAppForUser__icon-twitch" viewBox="0 0 128 134" width="14">
        <path
          d="M9 0L0 23v94h32v17h18l17-17h26l35-35V0H9zm107 76L96 96H64l-17 17V96H20V12h96v64zM96 35v35H84V35h12zm-32 0v35H52V35h12z"
          fill="#fff"
          fill-rule="evenodd"
        />
      </svg>
      Połącz z Twitch
    </div>
    <div class="MainCenterContainer__title-stream">
      {{ mainUserData.title }}
    </div>
    <div ref="panel" class="MainCenterContainer__live-container">
      <LoadingContent v-if="!(streamLoaded && chatLoaded)" />
      <div
        class="MainCenterContainer__live"
        :class="{ 'MainCenterContainer__live--small': smallVideo }"
      >
        <div
          class="MainCenterContainer__live-small-icon-container"
          :class="{
            'MainCenterContainer__live-small-icon-container--active': smallVideo
          }"
        >
          <div
            @click="(smallVideo = !smallVideo), (showVideo = false)"
            class="MainCenterContainer__live-exit-icon-container"
          >
            <div class="MainCenterContainer__live-small-icon-balt" />
            <div class="MainCenterContainer__live-small-icon-balt" />
          </div>
          <a href="#up">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 215.35 215.35">
              <path
                fill="#fff"
                d="M7.5 65.088a7.5 7.5 0 0 0 7.5-7.5V25.61l48.305 48.295a7.479 7.479 0 0 0 5.303 2.196c1.92 0 3.84-.732 5.304-2.197a7.498 7.498 0 0 0-.001-10.606L25.604 15.002h31.985a7.5 7.5 0 0 0 0-15H7.5a7.5 7.5 0 0 0-7.5 7.5v50.087a7.5 7.5 0 0 0 7.5 7.499zM207.85 150.262a7.5 7.5 0 0 0-7.5 7.5v31.979l-49.792-49.792a7.5 7.5 0 0 0-10.607 10.606l49.791 49.791h-31.977a7.5 7.5 0 0 0-7.5 7.5 7.5 7.5 0 0 0 7.5 7.5h50.086a7.5 7.5 0 0 0 7.5-7.5v-50.084a7.502 7.502 0 0 0-7.501-7.5zM64.792 139.949L15.005 189.74v-31.978c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v50.086a7.5 7.5 0 0 0 7.5 7.5h50.084a7.5 7.5 0 0 0 0-15H25.611l49.788-49.793a7.5 7.5 0 1 0-10.607-10.606zM207.85.002h-50.086a7.5 7.5 0 0 0-7.5 7.5 7.5 7.5 0 0 0 7.5 7.5h31.979l-48.298 48.301a7.5 7.5 0 0 0 5.304 12.803 7.482 7.482 0 0 0 5.304-2.197l48.298-48.301v31.98a7.5 7.5 0 0 0 7.5 7.5 7.5 7.5 0 0 0 7.5-7.5V7.502a7.501 7.501 0 0 0-7.501-7.5z"
              />
            </svg>
          </a>
        </div>
        <iframe
          class="MainCenterContainer__live"
          :class="{
            'MainCenterContainer__live--active': streamLoaded && chatLoaded,
            'MainCenterContainer__live--small': smallVideo
          }"
          allowfullscreen="true"
          @load="streamLoaded = true"
          src="http://player.twitch.tv/?allowfullscreen&channel=Dekier&origin=http%3A%2F%2Flocalhost%3A3000"
        />
      </div>
      <iframe
        class="MainCenterContainer__live-chat"
        :class="{
          'MainCenterContainer__live-chat--active': streamLoaded && chatLoaded
        }"
        scrolling="true"
        id="Dekier"
        @load="chatLoaded = true"
        src="https://www.twitch.tv/embed/dekier/chat?darkpopout"
      >
      </iframe>
    </div>
    <div class="MainCenterContainer__main-panel">
      <div
        v-if="streamData && streamData.status"
        class="MainCenterContainer__stream-title"
      >
        {{ streamData.status }}
      </div>
      <div class="MainCenterContainer__stream-panel-bottom-container">
        <div
          v-if="streamData && streamData.game"
          class="MainCenterContainer__stream-panel-categorie"
        >
          Kategoria: <span>{{ streamData.game }}</span>
        </div>
        <div
          v-if="streamData && streamData.views"
          class="MainCenterContainer__stream-panel-views"
        >
          Wyświetlenia: <span>{{ streamData.views }}</span>
        </div>
      </div>
    </div>
    <div
      v-if="streamData && streamData.followers"
      class="MainCenterContainer__followers-title"
    >
      Ostatnich {{ streamData.followers }} obserwujących:
    </div>
    <div class="MainCenterContainer__followers-container">
      <div class="MainCenterContainer__scrollbar-line" />
      <div class="MainCenterContainer__followers">
        <div
          v-for="user in followersData"
          :key="user._id"
          target="_blank"
          :href="`https://www.twitch.tv/${user.name}`"
          @mouseover="followerId = user._id"
          @mouseleave="followerId = 0"
          class="MainCenterContainer__follower"
          :style="userBackground(user)"
        >
          <div
            v-if="followerId === user._id"
            class="MainCenterContainer__follower-name"
          >
            {{ getUserName(user) }}
          </div>
        </div>
      </div>
    </div>
    <Calendar />
  </div>
</template>
  <script src="https://embed.twitch.tv/embed/v1.js"></script>

<script>
import userStatus from "~/components/mixins/Userstatus.mixin.vue";
import LoadingContent from "~/components/LoadingContent.vue";
import Calendar from "~/components/Calendar.vue";
export default {
  name: "MainCenterContainer",

  mixins: [userStatus],

  components: {
    LoadingContent,
    Calendar
  },

  data() {
    return {
      usersData: [],
      followerId: 0,
      chatLoaded: false,
      streamLoaded: false,
      smallVideo: false,
      showVideo: true
    };
  },

  mounted() {
    this.followers();
    window.addEventListener("scroll", this.detectElement);
  },

  computed: {
    followersData() {
      return this.$store.getters["stream/followersData"];
    },
    userToken() {
      return this.$store.getters["user/userToken"];
    },
    user_id() {
      return this.$store.getters["user_id"];
    },
    userTokenData() {
      return this.$store.getters["user/userTokenData"];
    },
    streamData() {
      return this.$store.getters["stream/streamData"];
    }
  },

  methods: {
    detectElement() {
      var elementTarget = this.$refs.panel;
      if (
        window.scrollY <
        elementTarget.offsetTop + elementTarget.offsetHeight
      ) {
        this.showVideo = true;
      }
      if (this.showVideo) {
        if (
          window.scrollY >
          elementTarget.offsetTop + elementTarget.offsetHeight
        ) {
          this.smallVideo = true;
        } else {
          this.smallVideo = false;
        }
      }
    },
    followers() {
      const data = {
        path: `https://api.twitch.tv/helix/users/follows?to_id=${
          this.user_id
        }&first=100`,
        method: "GET"
      };
      this.$store.dispatch("stream/setFollowers", data).then(response => {
        this.setUserData(response.data);
      });
    },

    setUserData(data) {
      if (data) {
        let params = "";
        for (let i = 0; i < data.length; i++) {
          if (i === 0) {
            params += `${data[i].from_name}`;
          } else {
            params += `,${data[i].from_name}`;
          }
        }

        const requestData = {
          path: `https://api.twitch.tv/kraken/users?login=${params}`,
          method: "GET"
        };
        this.$store.dispatch("stream/setUserData", requestData);
      }
    },

    userBackground(data) {
      if (data) {
        return { "background-image": `url(${data.logo})` };
      }
    },

    getUserName(data) {
      if (data) {
        return data.name;
      }
    },

    showAppForUser() {
      this.$emit("showAppForUser");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "MainCenterContainer";
</style>

