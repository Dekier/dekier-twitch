<template>
  <div class="container">
    <MainBackground />
    <MainCenterContainer/>
  </div>
</template>

<script>
import MainBackground from '~/components/MainBackground.vue'
import MainCenterContainer from '~/components/MainCenterContainer.vue'

export default {
  components: {
    MainBackground,
    MainCenterContainer
  },

  computed: {
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>

