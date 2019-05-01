<template>
  <div class="Game__main-container">
    <div @click="heh = !heh" class="Game__center-container">
      Tu będzie GRA xd
      <div :class="{ 'Game__lol--active': heh }" class="Game__lol" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Game",

  data() {
    return {
      heh: false
    };
  }
};
</script>

<style lang="scss" scoped>
@import "Game";
</style>

