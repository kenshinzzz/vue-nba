<template>
  <div>
    <div :class="!last ? 'game-player-playerBox' : 'game-player-playerBox game-player-playerBoxLast'">
      <div class="game-player-p2 game-player-p2Name"><span class="game-player-pName">{{player.first_name.substring(0, 1) + '.' + player.last_name}}</span></div>
      <div class="game-player-p1"><div class="game-player-p1-p"><span class="game-player-dataBox">{{player.starting_position ? player.starting_position : '-'}}</span></div></div>
    <div class="game-player-p1"><div class="game-player-p1-p"><span class="game-player-dataBox">{{player.points}}</span></div></div>
    <div class="game-player-p1"><div class="game-player-p1-p"><span class="game-player-dataBox">{{player.assists}}</span></div></div>
    <div class="game-player-p1"><div class="game-player-p1-p"><span class="game-player-dataBox">{{parseInt(player.rebounds_defensive, 10) + parseInt(player.rebounds_offensive, 10)}}</span></div></div>
    <div class="game-player-p1"><div class="game-player-p1-p"><span class="game-player-dataBox">{{player.field_goals_made + ' - ' + player.field_goals_attempted}}</span></div></div>
    <div class="game-player-p1"><div class="game-player-p1-p"><span class="game-player-dataBox">{{player.blocks}}</span></div></div>
    <div class="game-player-p1"><div class="game-player-p1-p"><span class="game-player-dataBox">{{player.steals}}</span></div></div>
    <div class="game-player-p1"><div class="game-player-p1-p"><span class="game-player-dataBox">{{player.three_pointers_made + ' - ' + player.three_pointers_attempted}}</span></div></div>
    <div class="game-player-p1"><div class="game-player-p1-p"><span class="game-player-dataBox">{{player.free_throws_made + ' - ' + player.free_throws_attempted}}</span></div></div>
    <div class="game-player-p1"><div class="game-player-p1-p"><span class="game-player-dataBox">{{player.turnovers}}</span></div></div>
    <div class="game-player-p1"><div class="game-player-p1-p"><span class="game-player-dataBox">{{player.fouls}}</span></div></div>
    <div class="game-player-p1"><div class="game-player-p1-p"><span class="game-player-dataBox">{{player.plus_minus}}</span></div></div>
    <div class="game-player-p1 game-player-lastP1"><div class="game-player-p1-p"><span class="game-player-dataBox">{{player.minutes}}</span></div></div>
    </div>
  </div>

</template>

<script>
 export default {
   name: 'player-row',
   data () {
     return {
       /* player: {
         first_name: 'steph',
         last_name: 'curry',
         starting_position: 'reb',
         points: 27,
         assists: 10,
         rebounds_defensive: 8,
         field_goals_made: 7,
         field_goals_attempted: 8,
         blocks: 5,
         steals: 4,
         three_pointers_made: 6,
         three_pointers_attempted: 10,
         free_throws_made: 7,
         free_throws_attempted: 15,
         turnovers: 10,
         fouls: 4,
         plus_minus: 16,
         minutes: 40
       } */
     }
   },
   props: {
     player: {
       require: true
     },
     last: {
       type: Boolean,
       default: false
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
</style>
