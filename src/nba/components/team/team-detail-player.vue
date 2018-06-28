<template>
  <div>
    <div>
      <div class="team-detail-player-container" @click="onPress">

        <div class="team-detail-player-portrait">
          <div class="team-detail-player-portraitBackground">
            <img class="team-detail-player-portraitImage" :style="{borderColor: teamMap.color}" :src="`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.id}.png`"
              onerror="this.src=''" />
                 <!--:src="`http://stats.nba.com/media/players/230x185/${player.id}.png`" />-->
          </div>
        </div>

        <div class="team-detail-player-info">
          <div class="team-detail-player-infoName">{{player.name}}</div>
          <div class="team-detail-player-infoPosition">{{player.pos}}  {{' '}}  {{player.num}}</div>
        </div>

        <div class="team-detail-player-data">
          <div class="team-detail-player-dataPerson">
            <div class="team-detail-player-dataPersonItem">Age: {{player.age}}</div>
            <div class="team-detail-player-dataPersonItem">Height: {{player.height}}</div>
            <div class="team-detail-player-dataPersonItem">Weight: {{player.weight}}</div>
          </div>
          <div class="team-detail-player-dataGame">
            <div class="team-detail-player-dataGameItem">
              <div class="team-detail-player-dataGameItemData">{{player.pts}}</div>
              <div class="team-detail-player-dataGameItemLabel">PTS</div>
            </div>
            <div class="team-detail-player-dataGameItem">
              <div class="team-detail-player-dataGameItemData">{{player.reb}}</div>
              <div class="team-detail-player-dataGameItemLabel">REB</div>
            </div>
            <div class="team-detail-player-dataGameItem">
              <div class="team-detail-player-dataGameItemData">{{player.ast}}</div>
              <div class="team-detail-player-dataGameItemLabel">AST</div>
            </div>
            <div class="team-detail-player-dataGameItem">
              <div class="team-detail-player-dataGameItemData">{{player.min}}</div>
              <div class="team-detail-player-dataGameItemLabel">MIN</div>
            </div>
            <div class="team-detail-player-dataGameItem">
              <div class="team-detail-player-dataGameItemData">{{player.gp}}</div>
              <div class="team-detail-player-dataGameItemLabel">GP</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
 import teamInfo from '../../utils/team-map'
 export default {
   name: 'team-detail-player',
   data () {
     return {
       teamMap: {}
     }
   },
   props: {
     team: {
       type: Object
     },
     player: {
       type: Object
     }
   },
   created () {
     this.teamMap = teamInfo[this.team.teamAbbr.toLowerCase()]
   },
   mounted () {
   },
   methods: {
     onPress () {
       this.$router.push({path: '/player-detail', query: {id: this.player.id}})
     }
   }
}
</script>
<style>
  .team-detail-player-container {
    border-color: #E1E1E1;
    border-bottom-width: 1px;
    height: 60px;
    flex-direction: row;
    display: flex;
    align-items: center;
   }

  .team-detail-player-portrait {
    flex: 1;
    justify-content: center;
   }
  .team-detail-player-portraitBackground {
    alignSelf: center;
    background-color: #fff;
    border-radius: 18px;
    height: 36px;
    width: 36px;
   }
  .team-detail-player-portraitImage {
    max-height: 36px;
    max-width: 36px;
    border-radius: 18px;
    border-width: 1px;
   }

  .team-detail-player-info {
    flex: 2;
    justify-content: center;
   }
  .team-detail-player-infoName {
    color: #7C7C7C;
    font-size: 12px;
   }
  .team-detail-player-infoPosition {
    color: #7C7C7C;
    font-size: 12px;
   }

  .team-detail-player-data {
    flex: 5;
    justify-content: center;
   }

  .team-detail-player-dataPerson {
    flex-direction: row;
    display: flex;
   }
  .team-detail-player-dataPersonItem {
    color: #909CAF;
    /*font-size: 10px;*/
    font-size: 12px;
    transform-origin: 0px bottom 0px;
    transform: scale(0.83);
    margin-right: 10px;

    flex: 1;
    white-space: nowrap;
   }

  .team-detail-player-dataGame {
    flex-direction: row;
    display: flex;
   }
  .team-detail-player-dataGameItem {
    align-items: flex-end;
    flex-direction: row;
    display: flex;
    margin-right: 10px;
   }
  .team-detail-player-dataGameItemData {
    color: #6B7C96;
    font-size: 12px;
    position: relative;
    top: 1px;
   }
  .team-detail-player-dataGameItemLabel {
    color: #6B7C96;
    /*font-size: 9px;*/
    font-size: 12px;
    transform-origin: 0px bottom 0px;
    transform: scale(0.75);
  }
</style>
