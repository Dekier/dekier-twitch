<template>
  <div class="AddAppForUser__main-container">
    <div
    v-if="!moreInformation"
    class="AddAppForUser__center-container">
      <div class="AddAppForUser__title">
        Jeżeli chcesz w pełni wykorzystać aplikację, połącz się z twitchem.
      </div>
      <a
      :href="userCodeUrl"
      class="AddAppForUser__btn-connect">
      <svg
      class="AddAppForUser__icon-twitch"
      viewBox="0 0 128 134" width="14">
        <path d="M9 0L0 23v94h32v17h18l17-17h26l35-35V0H9zm107 76L96 96H64l-17 17V96H20V12h96v64zM96 35v35H84V35h12zm-32 0v35H52V35h12z" fill="#fff" fill-rule="evenodd"/>
      </svg>
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
      <div
      @click="withoutLogin"
      class="AddAppForUser__btn">
        Pomiń
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
        Dlaczego warto połączyć się z twitchem?
      </div>

      <div class="AddAppForUser__more-info-subtitle">
        Połączenie z twitchem daje Tobie dostęp do większej zawartości aplikacji, takich jak:
      </div>
      <div class="AddAppForUser__more-info-text">
        <ul>
          <li class="AddAppForUser__info">
            Dodatkowe animacje
          </li>
          <li class="AddAppForUser__info">
            (Wkrótce) Branie udziału w konkursach / losowaniach
          </li>
          <li class="AddAppForUser__info">
            (Wkrótce) Branie udziału w rywalizacjach między obserującymi i subskrybentami
            dzięki grze na naszej stronie.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddAppForUser',

  props: {
    userCodeUrl: {
      type: String
    }
  },

  data () {
    return {
      moreInformation: false
    }
  },

  computed: {
  },

  methods: {
    withoutLogin () {
      this.$emit('withoutLogin')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'AddAppForUser';
</style>

