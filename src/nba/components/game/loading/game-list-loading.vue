<template>
  <div>
  <vue-content-loading :width="300" :height="70" v-for="i in 4" :key="i">
    <circle cx="70" cy="30" r="30" />
    <rect x="130" y="13" rx="4" ry="4" width="40" height="15" />
    <rect x="115" y="37" rx="4" ry="4" width="70" height="10" />
    <circle cx="230" cy="30" r="30" />
  </vue-content-loading>
  </div>
</template>

<script>
import VueContentLoading from 'vue-content-loading'
export default {
  name: 'game-list-loading',
  components: {
    VueContentLoading
  },
  data () {
    return {
    }
  }
}
</script>
<style>
</style>
