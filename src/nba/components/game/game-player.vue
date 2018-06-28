<template>
  <div>
    <div class="game-player-container">
        <div class="game-player-listView">
          <div class="game-player-playerBox game-player-titleRow">
            <div class="game-player-p2" />
            <div class="game-player-p1"><div class="game-player-p1-p"><span class="game-player-title">P</span></div></div>
            <div class="game-player-p1"><div class="game-player-p1-p"><span class="game-player-title">PTS</span></div></div>
            <div class="game-player-p1"><div class="game-player-p1-p"><span class="game-player-title">AST</span></div></div>
            <div class="game-player-p1"><div class="game-player-p1-p"><span class="game-player-title">REB</span></div></div>
            <div class="game-player-p1"><div class="game-player-p1-p"><span class="game-player-title">FG</span></div></div>
            <div class="game-player-p1"><div class="game-player-p1-p"><span class="game-player-title">BLK</span></div></div>
            <div class="game-player-p1"><div class="game-player-p1-p"><span class="game-player-title">STL</span></div></div>
            <div class="game-player-p1"><div class="game-player-p1-p"><span class="game-player-title">3PT</span></div></div>
            <div class="game-player-p1"><div class="game-player-p1-p"><span class="game-player-title">FT</span></div></div>
            <div class="game-player-p1"><div class="game-player-p1-p"><span class="game-player-title">TO</span></div></div>
            <div class="game-player-p1"><div class="game-player-p1-p"><span class="game-player-title">PF</span></div></div>
            <div class="game-player-p1"><div class="game-player-p1-p"><span class="game-player-title">+/-</span></div></div>
            <div class="game-player-p1 game-player-lastP1"><div class="game-player-p1-p"><span class="game-player-title">MIN</span></div></div>
          </div>

          <player-row v-for="(player,index) in playerList":player="player" :key="index" :last="index === playerList.length" />
        </div>
    </div>
  </div>

</template>

<script>
 import playerRow from './player-row'

 export default {
   name: 'game-player',
   components: {
     playerRow
   },
   data () {
     return {
       /* playerList: [
         {},
         {},
         {}
       ] */
     }
   },
   props: {
     playerList: {
       require: true
     }
   },
   created () {
   },
   mounted () {
   },
   methods: {
   }
}
</script>
<style>
  .game-player-container{
    flex: 13;
    position: relative;
    width: 100vw;
    overflow-y: scroll;
  }
  .game-player-scrollView{
    flex: 1;
    width: 400px;
  }
  .game-player-listView{
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 48px;
    margin-right: 30px;
    width: 800px;
  }
  .game-player-titleRow{
    border-bottom-color: #c2c2c2;
    border-bottom-width: 2px;
    height: 30px;
    border-style: solid;
  }
  .game-player-playerBox{
    align-items: stretch;
    border-bottom-color: #c2c2c2;
    border-bottom-width: 1px;
    flex: 1;
    display: flex;
    flex-direction: row;
    height: 30px;
    border-top-width: 0;
    border-right-width: 0;
    border-left-width: 0;
  }
  .game-player-playerBoxLast{
    border-bottom-width: 0
  }

  .game-player-title{
    align-self: center;
    color: #7F7F7F;
    font-size: 12px;
  }
  .game-player-pName{
    color: #222;
    font-size: 12px;
    padding-left: 5px;
  }
  .game-player-dataBox{
    align-self: center;
    color: #222;
    /*font-size: 11px;*/
    font-size: 12px;
    transform-origin: 0px bottom 0px;
    transform: scale(0.95);
  }
  .game-player-p1{
    align-items: center;
    border-right-color: #c2c2c2;
    border-right-width: 1;
    flex: 1;
    flex-direction: row;
    display: flex;
  }
  .game-player-p1-p{
    flex-direction: column;
    display: flex;
    flex: 1;
  }
  .game-player-lastP1{
    border-right-width: 0;
  }
  .game-player-p2{
    border-right-color: #c2c2c2;
    border-right-width: 1px;
    flex: 2;
    flex-direction: row;
    display: flex;
  }
  .game-player-p2Name{
    align-items: center;
    flex-direction: row;
    display: flex;
  }
</style>
