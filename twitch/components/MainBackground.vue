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
  }
}
</script>

<style lang="scss" scoped>
  @import 'MainBackground';
</style>

