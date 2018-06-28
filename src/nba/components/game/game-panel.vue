<template>
  <div>
      <div class="game-panel-container" :style="{backgroundColor: teamMapHome.color}" @click="onClick">

        <div class="game-panel-team">
          <img class="game-panel-teamLogo" :src="teamMapHome.logo">
            <div class="game-panel-teamCity">{{teamMapHome.city}}</div>
            <div class="game-panel-teamName">{{teamMapHome.team}}</div>
        </div>

        <div class="game-panel-gameInfo">
          <div class="game-panel-infoProcess" :class="`game-panel-process${cssType}`">{{gameProcess}}</div>
          <div class="game-panel-infoScorePanel" v-if="game.type !== 'unstart'">
            <div class="game-panel-infoScore">{{game.home.score}}</div>
            <div class="game-panel-infoDivider" />
            <div class="game-panel-infoScore">{{game.visitor.score}}</div>
          </div>
        </div>

        <div class="game-panel-team">
          <img class="game-panel-teamLogo" :src="teamMapVisitor.logo" >
          <div class="game-panel-teamCity">{{teamMapVisitor.city}}</div>
          <div class="game-panel-teamName">{{teamMapVisitor.team}}</div>
        </div>
      </div>
  </div>
</template>

<script>
 import teamMap from '../../utils/team-map'
 export default {
   name: 'game-panel',
   data () {
     return {
       gameProcess: '',
       cssType: '',
       teamMapHome: {},
       teamMapVisitor: {}
     }
   },
   props: {
     game: {
       require: true
     }
   },
   created () {
     let homeAbb = this.game.home.team.toLowerCase()
     let visitorAbb = this.game.visitor.team.toLowerCase()
     this.teamMapHome = teamMap[homeAbb]
     this.teamMapVisitor = teamMap[visitorAbb]

     this.gameProcess = ''
     this.cssType = ''
     switch (this.game.type) {
       case 'unstart':
         this.gameProcess = this.game.date.replace(/\s*ET\s*/, '')
         this.cssType = 'Unstart'
         break
       case 'live':
         this.gameProcess += this.game.process.quarter + ' '
         this.gameProcess += this.game.process.time.replace(/\s+/, '')
         this.cssType = 'Live'
         break
       case 'over':
         this.gameProcess = 'Final'
         this.cssType = 'Over'
         break
       default:
         return
     }
   },
   mounted () {
   },
   methods: {
     onClick () {
       if (this.game.type !== 'unstart') {
         this.$router.push({path: '/game-detail', query: {id: this.game.id}})
       }
     }
   }
}
</script>
<style>
  .game-panel-container {
    display: flex;
    border-radius: 5px;
    flex: 1;
    flex-direction: row;
    height: 100px;
    margin: 0 12px 10px;
  }

  .game-panel-team {
    align-items: center;
    border-radius: 5px;
    flex: 1.5;
    text-align: center;
  }
  .game-panel-teamLogo {
    width: 50px;
    height: 50px;
    margin-top: 10px;
  }
  .game-panel-teamCity{
    color: #fff;
    /*font-size: 11px;*/
    font-size: 12px;
    transform-origin: 0px bottom 0px;
    transform: scale(0.95);
    margin-top: 2px;
  }
  .game-panel-teamName{
    color: #fff;
    font-weight: bold;
    font-size: 13px;
    position: relative;
    top: 0;
  }

  .game-panel-gameInfo {
    align-items: center;
    flex: 1.5;
    flex-direction: column;
    text-align: center;
  }
  .game-panel-infoProcess{
    color: #fff;
    /*font-size: 10px;*/
    font-size: 12px;
    transform-origin: 0px bottom 0px;
    transform: scale(0.83);
    margin-top: 22px;
    margin-bottom: 3px;
  }
  .game-panel-processUnstart {
    font-size: 22px;
    position: relative;
    top: 13px;
  }
  .game-panel-infoScorePanel{
    flex: 1;
    flex-direction: row;
    justify-content: center;
    display: flex;
  }
  .game-panel-infoScore{
    color: #fff;
    font-weight: 100;
    font-size: 25px;
    text-align: center;
    width: 50px;
  }
  .game-panel-infoDivider{
    background-color: rgba(255, 255, 255, 0.3);
    height: 25px;
    margin-top: 7px;
    margin-left: 10px;
    margin-right: 10px;
    width: 1px;
  }
</style>
