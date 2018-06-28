<template>
  <div>
    <div class="player-trend-container">
      <div class="player-trend-title">+ / -</div>
      <div class="player-trend-scrollView" :style="{height: scrollHeight}">
        <player-trend-bar-item
          v-for="(d, index) in log"
          :key="index"
          :value="d.plusMinus"
          :high="footData.high"
          :low="footData.low"
          :color="color"
          :unitHeight="unitHeight"
          :date="d.gameDate"
          :barItemTop="16"
          :barInterval="2" />
      </div>
      <div class="player-trend-summary">
        <div class="player-trend-sumLeft">
          <div class="player-trend-sumAvg">{{(footData.avg).toFixed(2)}}</div>
          <div class="player-trend-sumAvgLabel">avg</div>
        </div>
        <div class="player-trend-sumRight">
          <div class="player-trend-sumPolarItem">
            <div class="player-trend-sumPolarLabel">Highest:</div>
            <div class="player-trend-sumPolarNumber">{{footData.high}}</div>
            <div class="player-trend-sumPolarLabel">{{'in ' + footData.highDate}}</div>
          </div>
          <div class="player-trend-sumPolarItem">
            <div class="player-trend-sumPolarLabel">Lowest:</div>
            <div class="player-trend-sumPolarNumber">{{footData.low}}</div>
            <div class="player-trend-sumPolarLabel">{{'in ' + footData.lowDate}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 // const barInterval = 2
 const barItemTop = 16
 import playerTrendBarItem from './player-trend-bar-item'
 export default {
   name: 'player-trend',
   components: {
     playerTrendBarItem
   },
   data () {
     return {
       unitHeight: 2
     }
   },
   props: {
     log: {
       type: Array
     },
     color: {
       type: String
     }
   },
   computed: {
     footData () {
       return this.calculateLog(this.log, 'plusMinus')
     },
     scrollHeight () {
       return this.footData.high * this.unitHeight + Math.abs(this.footData.low) * this.unitHeight + barItemTop + 'px'
     }
   },
   created () {
   },
   mounted () {
   },
   methods: {
     /**
     * calculate lowest, highest, average, total of a froup of data
     * @params data{Array} indicatior{String}
     * @return {low, high, lowDate, highDate, avg, sum, count}
     */
     calculateLog (data, indicator) {
       const count = data.length
       if (count === 0) {
         return {low: 0,
           high: 0,
           count,
           sum: 0,
           avg: 0,
           highDate: 0,
           lowDate: 0
         }
       }
       let high = data[0][indicator]
       let low = data[0][indicator]
       let highDate = data[0]['gameDate']
       let lowDate = data[0]['gameDate']
       let sum = 0
       let value
       data.forEach((d, index) => {
         value = d[indicator]
         sum += value
         if (value < low) {
           low = value
           lowDate = data[index]['gameDate']
         } else if (value > high) {
           high = value
           highDate = data[index]['gameDate']
         }
       })
       return {
         low,
         high,
         count,
         sum,
         avg: sum / count,
         highDate,
         lowDate
       }
     }
   }
}
</script>
<style>
  .player-trend-container {
    padding: 0 10px;
    padding-bottom: 30px;
  }
  .player-trend-title {
    color: #6B7C96;
    font-size: 13px;
    font-weight: 600;
  }
  .player-trend-scrollView {
    position: relative;
    display: flex;
    overflow-x: scroll;
  }

  .player-trend-summary {
    flex: 1;
    display: flex;
    flex-direction: row;
    height: 40px;
    margin-top: 20px;
  }
  .player-trend-sumLeft {
    align-items: flex-end;
    bottom: -4px;
    flex: 1;
    display: flex;
    flex-direction: row;
    position: relative;
  }
  .player-trend-sumAvg {
    color: #909CAF;
    font-size: 25px;
    font-weight: 200;
  }
  .player-trend-sumAvgLabel {
    color: #909CAF;
    margin-left: 2px;
    position: relative;
    top: -3px;
  }
  .player-trend-sumRight {
    flex: 1;
    justify-content: flex-end;
  }
  .player-trend-sumPolarItem {
    align-items: flex-end;
    flex-direction: row;
    display: flex;
    justify-content: flex-end;
    margin-top: 2px;
  }
  .player-trend-sumPolarLabel {
    color: #909CAF;
    /*font-size: 11px;*/
    font-size: 12px;
    transform-origin: 0px bottom 0px;
    transform: scale(0.95);
    margin-left: 3px;
  }
  .player-trend-sumPolarNumber {
    color: #6B7C96;
    font-size: 15px;
    margin-left: 3px;
    position: relative;
    top: 1.5px;
  }
</style>
