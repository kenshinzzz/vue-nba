<template>
  <div id="app">
    <div>
      <transition name="fade" mode="out-in">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" :class="{'app-hidden': chgKeepAlive === 'nk'}"></router-view>
        </keep-alive>
      </transition>

      <tabber :select="select" v-show="$route.meta.keepAlive" >
      </tabber>

      <transition name="fade" mode="out-in" >
        <router-view v-if="!$route.meta.keepAlive" :class="{'app-hidden': chgKeepAlive === 'k'}"></router-view>
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
</style>
