<template>
  <div>
    <div class="player-log-container">

      <div class="player-log-item">
        <div class="player-log-label">Points</div>
        <div class="player-log-data">
          <div v-if="pts" class="player-log-bar player-log-points" :style="{width: pts + 'px'}" />

          <div class="player-log-dataNumber">{{data.pts}}</div>
        </div>
      </div>
      <div class="player-log-item">
        <div class="player-log-label">Assists</div>
        <div class="player-log-data">
          <div v-if="ast" class="player-log-bar player-log-assists" :style="{width: ast + 'px'}" />

          <div class="player-log-dataNumber">{{data.ast}}</div>
        </div>
      </div>
      <div class="player-log-item">
        <div class="player-log-label">Rebounds</div>
        <div class="player-log-data">
          <div  v-if="reb" class="player-log-bar player-log-rebounds" :style="{width: reb + 'px'}" />

          <div class="player-log-dataNumber">{{data.reb}}</div>
        </div>
      </div>
      <div class="player-log-item">
        <div class="player-log-label">Steals</div>
        <div class="player-log-data">
          <div  v-if="stl" class="player-log-bar player-log-steals"  :style="{width: stl + 'px'}" />

          <div class="player-log-dataNumber">{{data.stl}}</div>
        </div>
      </div>
      <div class="player-log-item">
        <div class="player-log-label">Blocks</div>
        <div class="player-log-data">
          <div  v-if="blk" class="player-log-bar player-log-blocks" :style="{width: blk + 'px'}" />

          <div class="player-log-dataNumber">{{data.blk}}</div>
        </div>
      </div>
      <div class="player-log-item">
        <div class="player-log-label">Turnovers</div>
        <div class="player-log-data">
          <div v-if="tov" class="player-log-bar player-log-turnovers" :style="{width: tov + 'px'}" />

          <div class="player-log-dataNumber">{{data.tov}}</div>
        </div>
      </div>
      <div class="player-log-item">
        <div class="player-log-label">Minutes</div>
        <div class="player-log-data">
          <div v-if="min" class="player-log-bar player-log-minutes" :style="{width: min + 'px'}" />

          <div class="player-log-dataNumber">{{data.min}}</div>
        </div>
      </div>

      <div class="player-log-controller">
        <div class="player-log-button" :style="{opacity: canPrev}" @click="onPressLeft">
          <i class="el-icon-arrow-left player-log-chevronLeft"></i>
        </div>
        <div class="player-log-date">{{date}}</div>
        <div class="player-log-button" :style="{opacity: canNext}" @click="onPressRight">
          <i class="el-icon-arrow-right player-log-chevronRight"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 export default {
   name: 'player-log',
   data () {
     return {
       pts: 0,
       ast: 0,
       reb: 0,
       stl: 0,
       blk: 0,
       tov: 0,
       min: 0,
       currentIndex: 0
     }
   },
   computed: {
     data () {
       if (this.log && this.log[this.currentIndex]) {
         return this.log[this.currentIndex]
       } else {
         return {}
       }
     },
     date () {
       if (this.data && this.data.gameDate) {
         const d = new Date(this.data.gameDate)
         return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
       } else {
         return ''
       }
     },
     canPrev () {
       return this.currentIndex < this.log.length - 1 ? 1 : 0
     },
     canNext () {
       return this.currentIndex > 0 ? 1 : 0
     }
   },
   props: {
     log: {
       type: Array,
       require: true
     }
   },
   created () {
   },
   mounted () {
     const width = this.getWidth(this.data)
     this.pts = width.pts
     this.ast = width.ast
     this.reb = width.reb
     this.stl = width.stl
     this.blk = width.blk
     this.tov = width.tov
     this.min = width.min
   },
   methods: {
     /**
     * Calculate width of each bar
     * @params {pts: {Number}, ast, reb, stl, blk, tov, min}
     * @return {pts: {Number}, ast, reb, stl, blk, tov, min}
     */
     getWidth (data) {
       const deviceWidth = document.documentElement.clientWidth
       const maxWidth = 350
       const indicators = ['pts', 'ast', 'reb', 'stl', 'blk', 'tov', 'min']
       const unit = {
         ptsUnit: Math.floor(maxWidth / 45),
         astUnit: Math.floor(maxWidth / 15),
         rebUnit: Math.floor(maxWidth / 18),
         stlUnit: Math.floor(maxWidth / 6),
         blkUnit: Math.floor(maxWidth / 7),
         tovUnit: Math.floor(maxWidth / 10),
         minUnit: Math.floor(maxWidth / 60)
       }
       let width = {}
       let widthCap // Give with a max cap
       indicators.forEach(item => {
         /* React-Native bug: if width=0 at first time, the borderRadius can't be implemented in the View */
         widthCap = data[item] * unit[`${item}Unit`] || 5
         width[item] = widthCap <= (deviceWidth - 50) ? widthCap : (deviceWidth - 50)
       })
       return width
     },
     onPressLeft () {
       if (this.currentIndex < this.log.length - 1) {
         this.handleAnimation(this.currentIndex + 1)
       }
     },
     onPressRight () {
       if (this.currentIndex > 0) {
         this.handleAnimation(this.currentIndex - 1)
       }
     },
     handleAnimation (index) {
       const width = this.getWidth(this.log[index])
       const indicators = ['pts', 'ast', 'reb', 'stl', 'blk', 'tov', 'min']
       indicators.map(item => {
         this.$data[item] = width[item]
       })
       this.currentIndex = index
     }
   }
}
</script>
<style>
  .player-log-container {
    flex-direction: column;
    margin-top: 6px;
  }

  .player-log-item {
    flex-direction: column;
    margin-bottom: 5px;
    padding: 0 10px;
  }
  .player-log-label {
    color: #CBCBCB;
    flex: 1;
    font-size: 12px;
    position: relative;
    top: 2px;
  }
  .player-log-data {
    flex: 2;
    flex-direction: row;
    display: flex;
  }
  .player-log-dataNumber {
    color: #CBCBCB;
    /*font-size: 11px;*/
    font-size: 12px;
    transform-origin: 0px bottom 0px;
    transform: scale(0.95);
  }

  .player-log-bar {
    align-self: center;
    border-radius: 5px;
    height: 8px;
    margin-right: 5px;
    transition: width 1s;
    transition-delay: 0s;
  }
  .player-log-points {
    background-color: #F55443;
  }
  .player-log-assists {
    background-color: #FCBD24;
  }
  .player-log-rebounds {
    background-color: #59838B;
  }
  .player-log-steals {
    background-color: #4D98E4;
  }
  .player-log-blocks {
    background-color: #418E50;
  }
  .player-log-turnovers {
    background-color: #7B7FEC;
  }
  .player-log-minutes {
    background-color: #3ABAA4;
  }

  .player-log-controller {
    flex: 1;
    flex-direction: row;
    justify-content: center;
    margin-top: 15px;
    display: flex;
  }
  .player-log-button {
    flex: 1;
    position: relative;
    top: -1px;
    text-align: center;
    align-items: center;
    display: flex;
  }
  .player-log-chevronLeft {
    /*align-self: flex-end;
    height: 28px; */
    margin-right: 10px;
    width: 100%;
    color: #6B7C96;
  }
  .player-log-chevronRight {
    /*align-self: flex-start;
    height: 28px;*/
    margin-left: 10px;
    width: 100%;
    color: #6B7C96;
  }
  .player-log-date {
    color: #6B7C96;
    flex: 1;
    font-size: 22px;
    font-weight: 300;
    height: 28px;
    text-align: center;
  }
</style>
