<template>
  <div class="container">
    <MainBackground :userTokenData="userTokenData" />
    <MainCenterContainer
      @showAppForUser="showAppForUser"
      v-if="!activeAddAppDropdown"
    />
    <Game v-if="!activeAddAppDropdown" />
    <AddAppForUser
      v-if="activeAddAppDropdown"
      :userCodeUrl="userCodeUrl"
      @withoutLogin="withoutLogin"
    />
  </div>
</template>

<script>
import MainBackground from "~/components/MainBackground.vue";
import MainCenterContainer from "~/components/MainCenterContainer.vue";
import AddAppForUser from "~/components/AddAppForUser.vue";
import Game from "~/components/games/Game.vue";

export default {
  components: {
    MainBackground,
    MainCenterContainer,
    AddAppForUser,
    Game
  },

  data() {
    return {
      userCodeUrl: "",
      activeAddAppDropdown: true
    };
  },

  mounted() {
    this.getUserTokenData();
    this.setChannelData();
    if (this.userTokenData) {
      this.activeAddAppDropdown = false;
    } else if (!this.$route.query.code) {
      this.getUserCode();
    } else if (this.$route.query.code) {
      this.checkUserCode();
    }
  },

  computed: {
    clientId: {
      get() {
        return this.$store.getters["clientId"];
      }
    },
    clientSecret: {
      get() {
        return this.$store.getters["clientSecret"];
      }
    },
    userTokenData: {
      get() {
        return this.$store.getters["user/userTokenData"];
      }
    }
  },

  methods: {
    getUserTokenData() {
      this.$store.dispatch("user/getUserTokenData");
    },
    getUserCode() {
      var request = new XMLHttpRequest();
      var method = "GET";
      var url = `https://id.twitch.tv/oauth2/authorize?client_id=${
        this.clientId
      }&redirect_uri=http://localhost:3000&response_type=code&scope=openid&state=siematumarcin`;
      var async = true;
      request.open(method, url, async);
      request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
          this.userCodeUrl = request.responseURL;
        }
      };
      request.send();
    },
    checkUserCode() {
      this.$store.dispatch("user/getUserCodeLocalStorage").then(data => {
        if (this.$route.query && this.$route.query.code) {
          this.getUserToken(this.$route.query.code);
        }
      });
    },
    getUserToken(code) {
      var request = new XMLHttpRequest();
      var method = "POST";
      var url = `https://id.twitch.tv/oauth2/token?client_id=${
        this.clientId
      }&client_secret=${
        this.clientSecret
      }&code=${code}&grant_type=authorization_code&redirect_uri=http://localhost:3000`;
      var async = true;
      request.open(method, url, async);
      request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
          const userTokenData = request.response;
          this.$store.dispatch("user/setUserToken", userTokenData);
          this.activeAddAppDropdown = false;
        }
      };
      request.send();
    },
    withoutLogin() {
      this.activeAddAppDropdown = false;
    },
    showAppForUser() {
      this.activeAddAppDropdown = true;
    },
    setChannelData() {
      const data = {
        path: ` https://api.twitch.tv/kraken/channels/226325627`,
        method: "GET"
      };
      this.$store.dispatch("stream/setChannelData", data);
      // .then( response => {
      //     this.setUserData(response.data)
      // })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

