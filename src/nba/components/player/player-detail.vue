<template>
  <div>
    <div class="player-detail-container">
      <div>
        <div class="player-detail-navigation" :style="{backgroundColor: team.color}">
          <!--<router-link to="/player-index">-->
            <i class="el-icon-arrow-left player-detail-backIcon" @click="back"></i>
          <!--</router-link>-->
        </div>

        <div class="player-detail-header" :style="{backgroundColor: team.color}">
          <div class="player-detail-portraitView">
            <div class="player-detail-portrait" :style="potrait"/>
          </div>
          <div class="player-detail-name">{{player.firstName}} {{' '}} {{player.lastName}}</div>
          <div class="player-detail-jersey">{{player.jersey}}</div>
        </div>

        <div :style="{height: scrollHeight}">
          <div class="player-detail-basicData">
            <div class="player-detail-basicDataBlock">
              <div class="player-detail-basicDataNumber">{{player.pts}}</div>
              <div class="player-detail-basicDataMark">Points</div>
            </div>
            <div class="player-detail-basicDataBlock">
              <div class="player-detail-basicDataNumber">{{player.ast}}</div>
              <div class="player-detail-basicDataMark">Assists</div>
            </div>
            <div class="player-detail-basicDataBlock">
              <div class="player-detail-basicDataNumber">{{player.reb}}</div>
              <div class="player-detail-basicDataMark">Rebounds</div>
            </div>
          </div>

          <div v-if="player.log">
            <player-log :log="player.log" />
            <div class="player-detail-logDivider" />
            <player-trend :log="player.log" :color="team.color" />
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
 import teamMap from '../../utils/team-map'
 import playerLog from './player-log'
 import playerTrend from './player-trend'
 import actions from '../../actions/player'
 import {mapGetters} from 'vuex'
 export default {
   components: {
     playerLog, playerTrend
   },
   data () {
     return {
       id: '',
       /* player: {
         firstName: 'Stephen',
         id: 201939,
         lastName: 'Curry',
         name: 'Stephen Curry',
         teamAbbr: 'GSW',
         teamCity: 'Golden State',
         teamId: 1610612744,
         teamName: 'Warriors',
         pts: 23,
         reb: 11,
         ast: 8,
         team: 'cha',
         log: {}
       }, */
       scrollHeight: '0px'
     }
   },
   computed: {
     player () {
       let p = this.playerLoaded[this.id]
       if (p) {
         return p
       } else {
         return {}
       }
     },
     team () {
       if (this.player.team) {
         return teamMap[this.player.team.toLowerCase()]
       } else {
         return {}
       }
     },
     potrait () {
       if (this.player.id) {
         return {backgroundImage: `url(https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${this.player.id}.png)`}
       } else {
         return {background: '#fff'}
       }
     },
     ...mapGetters(['playerLoaded'])
   },
   created () {
     this.id = this.$route.query.id
     actions.getPlayerDetail(this.id)
       .then(() => {
         actions.getPlayerLog(this.id)
       })
   },
   mounted () {
     this.scrollHeight = (document.documentElement.clientHeight - 150) + 'px'
   },
   methods: {
     back () {
       this.$router.go(-1)
     }
   }
}
</script>
<style>
 .player-detail-container{
    flex-direction: column;
   }

  .player-detail-navigation {
    flex-direction: row;
    height: 30px;
   }
  .player-detail-backIcon {
    height: 30px;
    margin-left: 6px;
    margin-top: 6px;
    width: 30px;
    color: #fff;
   }

  .player-detail-header {
    height: 120px;
    text-align: center;
    width: 100vw;
   }
  .player-detail-portraitView {
    align-self: center;
    padding-top: 5px;
    height: 60px;
    /*width: 60px;
    background-color: #fff;
    border-radius: 60px;*/
    width: 100vw;
   }
  .player-detail-portrait {
    height: 60px;
    width: 60px;
    border-radius: 30px;
    /*background-color: #fff;*/
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    margin: auto;
   }
  .player-detail-name {
    align-self: center;
    color: #fff;
    font-size: 16px;
    margin-top: 5px;
   }
  .player-detail-jersey {
    align-self: center;
    color: #fff;
    font-size: 14px;
   }

  .player-detail-basicData {
    flex-direction: row;
    height: 28px;
    justify-content: center;
    display: flex;
    text-align: center;
   }
  .player-detail-basicDataBlock {
    align-items: flex-end;
    flex-direction: row;
    justify-content: center;
    width: 100px;
    display: flex;
   }
  .player-detail-basicDataNumber {
    color: #909CAF;
    font-size: 19px;
    font-weight: 500;
    margin-right: 3px;
   }
  .player-detail-basicDataMark {
    color: #909CAF;
    font-size: 12px;
    position: relative;
    bottom: 1px;
   }

  .player-detail-logDivider {
    background-color: #eee;
    height: 3px;
    margin: 15px 10px;
  }
</style>
