<template>
  <div class="MainCenterContainer__main-container">
    <div class="MainCenterContainer__live-container">
      <iframe
      class="MainCenterContainer__live"
      src="http://player.twitch.tv/?allowfullscreen&channel=Dekier&origin=http%3A%2F%2Flocalhost%3A3000"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainCenterContainer'
}
</script>

<style lang="scss" scoped>
@import 'MainCenterContainer';
</style>

