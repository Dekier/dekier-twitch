<template>
  <div
  v-if="!userToken" 
  class="AddAppForUser__main-container">
  {{moreInformation}}
    <div
    v-if="!moreInformation"
    class="AddAppForUser__center-container">
      <div class="AddAppForUser__title">
        Jeżeli chcesz w pełni wykorzystać aplikację, połącz się z twitchem.
      </div>
      <a
      :href="userTokenUrl"
      class="AddAppForUser__btn-connect">
        Połącz z Twitch
      </a>
      <div
      class="AddAppForUser__title">
        Dlaczego warto połączyć się z twitchem?
      </div>
      <div
      @click="moreInformation = true"
      class="AddAppForUser__btn-why">
        Dlaczego?
      </div>
    </div>
    <div
    v-if="moreInformation"
    class="AddAppForUser__center-container">
      <div
      class="AddAppForUser__back-btn"
      @click="moreInformation = false">
        wróć
      </div>
      <div class="AddAppForUser__more-info-title">
        Co daje połączenie z Twitchem?
      </div>

      <div class="AddAppForUser__more-info-subtitle">
        Dla widza:
      </div>

      <div class="AddAppForUser__more-info-subtitle">
        Dla widza, który obserwuje:
      </div>

      <div class="AddAppForUser__more-info-subtitle">
        Dla widza, który subskrybuje:
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddAppForUser',

  props: {
    userTokenUrl: {
      type: String
    }
  },

  data () {
    return {
      moreInformation: false
    }
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
  }
}
</script>

<style lang="scss" scoped>
  @import 'AddAppForUser';
</style>

