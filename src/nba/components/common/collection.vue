<template>
   <div class="collection-container" @touchend="onScroll">
     <slot />
  </div>
</template>

<script>

export default {
  name: 'collection',
  computed: {
  },
  created () {
  },
  methods: {
    onScroll (e) {
      this.lastScroll = window.scrollX
      if (this.scrollTime) {
        clearInterval(this.scrollTime)
      }
      this.scrollTime = setInterval(() => {
        let x = window.scrollX
        if (this.lastScroll === x) {
          clearInterval(this.scrollTime)
          this.scrollTime = null
          if (x < this.screenWidth / 2) {
            window.scroll(0, window.scrollY)
            this.$emit('scroll', 0)
          } else {
            window.scroll(this.screenWidth, 0)
            this.$emit('scroll', 1)
          }
        } else {
          this.lastScroll = x
        }
      }, 100)
    }
  },
  mounted () {
    this.screenWidth = document.documentElement.clientWidth
    this.screenHeight = document.documentElement.clientHeight - 40
  },
  data () {
    return {
      screenWidth: 0,
      screenHeight: 0,
      lastScroll: 0,
      scrollTime: null
    }
  }
}
</script>
<style>
  .collection-container {
    flex-direction: row;
    display: flex;
  }
</style>
