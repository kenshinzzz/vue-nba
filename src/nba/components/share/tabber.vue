<template>
  <div style="z-index: 100;position: absolute;top: 100px;">
    <tab class="game-list-tab" :class="`game-list-tab${value}`">
      <tab-item :selected="value === 0" @on-item-click="handler">
        Game
      </tab-item >
      <tab-item :selected="value === 1" @on-item-click="handler">
        Player
      </tab-item >
      <tab-item :selected="value === 2" @on-item-click="handler">
        Team
      </tab-item >
    </tab>
  </div>
</template>

<script>
 import { Tab, TabItem } from 'vux'
 export default {
   name: 'tabber',
   components: {
     Tab, TabItem
   },
   data () {
     return {
       value: 0
     }
   },
   props: {
     select: {
       type: Number,
       default: 0
     }
   },
   computed: {
   },
   watch: {
     select () {
       this.value = this.select
     }
   },
   created () {
   },
   mounted () {
   },
   methods: {
     handler (index) {
       if (this.value === index) {
         return
       }
       this.value = index
       switch (index) {
         case 0:
           this.$router.push('/index')
           break
         case 1:
           this.$router.push('/player-index')
           break
         case 2:
           this.$router.push('/team-list')
           break
       }
     }
   }
}
</script>
<style>
  .game-list-tab .vux-tab{
    /*background-color: #3471AE;*/
    color: #fff;
    position: fixed;
    width: 100vw;
  }
  .game-list-tab0  .vux-tab{
    background-color: #3471AE;
  }
  .game-list-tab1  .vux-tab{
    background-color: #BD4C29;
  }
  .game-list-tab2  .vux-tab{
    background-color: #1C8929;
  }

  .game-list-tab .vux-tab .vux-tab-item{
    color: #fff;
  }
  .game-list-tab .vux-tab .vux-tab-item.vux-tab-selected{
    color: #fff;
    border-bottom: 3px solid #fff;
  }
  .game-list-tab .vux-tab-ink-bar{
    background-color: #fff;
  }
</style>
