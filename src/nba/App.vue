<template>
  <div id="app">
    <div>
      <div class="app-main">
        <keep-alive>
          <router-view name="main"></router-view>
        </keep-alive>

        <tabber :select="select">
        </tabber>
      </div>

      <transition name="fade" mode="out-in" >
        <router-view  name="default" class="app-sub-page"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import tabber from './components/share/tabber'
export default {
  name: 'app',
  data () {
    return {
      select: 0
    }
  },
  components: {
    tabber
  },
  created () {
  },
  watch: {
    $route (to, from) {
      if (to.meta && to.meta.tab && this.select !== to.meta.tab) {
        this.select = to.meta.tab
      }
    }
  },
  computed: {
    ...mapGetters(['chgKeepAlive'])
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .3s ease;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .app-hidden {
    display: none;
  }
  .app-sub-page {
    position: absolute;
    top: 0px;
    /*bottom: 0px;*/
    background: #eee;
    /*height: 100%;*/
    width: 100%;
    min-height: 100%;
    /* overflow: hidden; */
    right: 0;
    left: 0;
    z-index: 150;
  }
  .app-main {
    transition: 0.5s;
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background: #efeff4;
  }
</style>
