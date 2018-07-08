<template>
  <div>
    <div style="height: 100px;">
      <div class="index-skeleton-title"></div>
      <div class="index-skeleton-desc"></div>
    </div>
    <div class="index-skeleton-nav"></div>
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
  name: 'skeleton',
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
  .index-skeleton-title{
    height: 15px;
    width: 100px;
    background: #e0e0e0;
    top: 15px;
    position: absolute;
    left: 20px;
  }

  .index-skeleton-desc{
    height: 18px;
    width: 150px;
    background: #e0e0e0;
    top: 40px;
    position: absolute;
    left: 20px;
  }
  .index-skeleton-nav{
    height: 45px;
    background: #e0e0e0;
    margin-bottom: 20px;
  }
</style>
