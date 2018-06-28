<template>
  <div>
    <div @touchstart="onPressIn" @touchend="onPressOut">
      <div class="player-trend-bar-container" :style="{marginTop: barItemTop + 'px'}">
        <div class="player-trend-bar-barWrapper" :style="wrapperStyle">
          <div class="player-trend-bar-bar player-trend-bar-empty" :style="[baseStyle, {height: empty * unitHeight + 'px'}]" />
          <div class="player-trend-bar-bar" :style="[baseStyle, {height: entity * unitHeight + 'px'}]" />
        </div>

        <div v-if="isHover" class="player-trend-bar-tooltip" :style="tooltipPosition">
          <div class="player-trend-bar-tooltipContent">{{value + ' in ' + date}}</div>
          <div class="player-trend-bar-tooltipMark" :style="tooltipMark" />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
 const tooltipWidth = 100
 const barWidth = 15
 export default {
   name: 'player-trend-bar-item',
   data () {
     return {
       isHover: false,
       isHoverCovered: false,
       isHoverCoveredRight: false,
       empty: 0,
       entity: 0
     }
   },
   props: {
     value: {
       type: Number
     },
     high: {
       type: Number
     },
     low: {
       type: Number
     },
     color: {
       type: String
     },
     unitHeight: {
       type: Number
     },
     date: {
       type: String
     },
     barItemTop: {
       type: Number
     },
     barInterval: {
       type: Number
     }
   },
   computed: {
     wrapperStyle () {
       if (this.value >= 0) {
         this.entity = this.value
         this.empty = this.high - this.value
         return {}
       } else {
         this.entity = Math.abs(this.value)
         this.empty = Math.abs(this.low) - this.entity
         return {
           top: this.high * this.unitHeight + 'px', //  * this.unitHeight
           right: this.barInterval + 'px',
           transform: 'rotate(180deg)'
         }
       }
     },
     baseStyle () {
       // let entity = Math.abs(this.value)
       return {
         backgroundColor: this.color,
         marginRight: this.barInterval + 'px'
         // height: this.entity * this.unitHeight + 'px'
       }
     },
     tooltipPosition () {
       let tooltipPosition = {
         left: -(tooltipWidth / 2) + 'px',
         marginLeft: barWidth / 2 + 'px'
       }
       if (this.isHoverCoveredLeft) {
         tooltipPosition.left = 0
         tooltipPosition.marginLeft = 0
       } else if (this.isHoverCoveredRight) {
         delete tooltipPosition.left
         delete tooltipPosition.marginLeft
         tooltipPosition.right = 3 + 'px'
       }
       return tooltipPosition
     },
     tooltipMark () {
       let tooltipMark = {
         left: tooltipWidth / 2 + 'px',
         marginLeft: -6 + 'px',
         borderLeftWidth: 6 + 'px',
         borderRightWidth: 6 + 'px'
       }
       if (this.isHoverCoveredLeft) {
         tooltipMark.left = 5 + 'px'
         tooltipMark.marginLeft = 0
         delete tooltipMark.borderLeftWidth
       } else if (this.isHoverCoveredRight) {
         delete tooltipMark.left
         delete tooltipMark.marginLeft
         delete tooltipMark.borderRightWidth
         tooltipMark.right = 5 + 'px'
       }
       return tooltipMark
     }
   },
   created () {
   },
   mounted () {
   },
   methods: {
     onPressIn (e) {
       const screenWidth = document.documentElement.clientWidth
       this.isHover = true
       let x = Number(e.touches[0].pageX)
       this.isHoverCoveredLeft = x < (tooltipWidth / 2 + 10)
       this.isHoverCoveredRight = x + tooltipWidth / 2 + 20 > screenWidth
     },
     onPressOut (e) {
       this.isHover = false
       this.isHoverCovered = false
       this.isHoverCoveredRight = false
     }
   }
}
</script>
<style>
  .player-trend-bar-container {
    position:  relative;
  }
  .player-trend-bar-barWrapper {
    position:  relative;
   }
  .player-trend-bar-bar {
    width: 15px;
   }
  .player-trend-bar-empty {
    opacity: 0.2;
  }
  .player-trend-bar-tooltip {
     background-color: rgba(0, 0, 0, 0.8);
     border-radius: 5px;
    padding: 2px 3px;
    position:  absolute;
    top: -17px;
    width: 100px;
  }
  .player-trend-bar-tooltipContent {
    color: #fff;
    /*font-size: 9px;*/
    font-size: 12px;
    transform-origin: 0px bottom 0px;
    transform: scale(0.75);
    text-align: center;
  }
  .player-trend-bar-tooltipMark {
    border-top-color: rgba(0, 0, 0, 0.8);
    border-top-width: 5px;
    border-left-color: transparent;
    border-right-color: transparent;
    bottom: -5px;
    position:  absolute;
    height: 0;
    width: 0;
  }
</style>
