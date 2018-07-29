<template>
  <div>
    <div style="flex: 1">
      <!--<x-header :left-options="{backText: ''}"  >-->
        <!--<x-icon slot="overwrite-left" type="ios-arrow-left" size="35" class="game-detail-backNav" @click="back"></x-icon>-->
      <!--</x-header>-->
      <div class="game-detail-nav" :style="{backgroundColor: teamMapHome.color}">
        <!--<router-link to="/team-list">-->
          <i class="el-icon-arrow-left game-detail-backNav" @click="back"></i>
        <!--</router-link>-->
      </div>

      <div class="game-detail-sumContainer" :style="{backgroundColor: teamMapHome.color}">
        <div class="game-detail-team">
          <img class="game-detail-teamLogo" :src="teamMapHome.logo">
          <div class="game-detail-teamCity">{{teamMapHome.city}}</div>
          <div class="game-detail-teamName">{{teamMapHome.team}}</div>
          <div class="game-detail-standing">{{homeStand}}</div>
        </div>

        <div class="game-detail-gameInfo">
          <div class="game-detail-infoProcess" :class="`game-detail-process${cssType}`">{{gameProcess}}</div>
          <div class="game-detail-infoScorePanel" v-if="game.type !== 'unstart'">
            <div class="game-detail-infoScoreBlock">
              <div class="game-detail-infoSide">Home</div>
              <div class="game-detail-infoScore">{{game.home.score}}</div>
            </div>
            <div class="game-detail-infoDivider" />
            <div class="game-detail-infoScoreBlock">
              <div class="game-detail-infoSide">Away</div>
              <div class="game-detail-infoScore">{{game.visitor.score}}</div>
            </div>
          </div>
        </div>

        <div class="game-detail-team">
          <img class="game-detail-teamLogo" :src="teamMapVisitor.logo" >
          <div class="game-detail-teamCity">{{teamMapVisitor.city}}</div>
          <div class="game-detail-teamName">{{teamMapVisitor.team}}</div>
            <div class="game-detail-standing">{{visitorStand}}</div>
        </div>
      </div>

      <!--{/* Switch */}-->
      <div class="game-detail-segment">
          <div class="game-detail-segPanelInner" @click="selectedIndex = 0">
            <div class="game-detail-segTeam" :class="`game-detail-segTeam${homeCss}`">{{teamMapHome.city + ' ' + teamMapHome.team}}</div>
            <div :style="homeCss === 'Active' ? {backgroundColor: teamMapHome.color, height: '4px'} : {opacity: 0}" />
          </div>
          <div class="game-detail-segPanelInner" @click="selectedIndex = 1">
            <div  class="game-detail-segTeam" :class="`game-detail-segTeam${visitorCss}`">{{teamMapVisitor.city + ' ' + teamMapVisitor.team}}</div>
            <div :style="visitorCss === 'Active' ? {backgroundColor: teamMapVisitor.color, height: '4px'} : {opacity: 0}"/>
          </div>
      </div>
      <!--{/* TODO: activity indicator can be a component */}-->
      <!--{indicator && Platform.OS === 'ios' &&-->
      <!--<View style={styles.indicatorView}>-->
        <!--<ActivityIndicatorIOS-->
          <!--animating-->
          <!--color={selectedIndex === 0 ? teamMap[homeAbb].color : teamMap[visitorAbb].color}-->
        <!--style={styles.indicator}-->
        <!--size='large'-->
        <!--/>-->
      <!--</View>-->
      <!--}-->
      <!--{indicator && Platform.OS === 'android' &&-->
      <!--<View style={styles.indicatorView}>-->
        <!--<Text>Loading...</Text>-->
      <!--</View>-->
      <!--}-->
      <!--{!indicator && game.detail.loaded &&-->
      <!--<GamePlayers detail={selectedIndex === 0 ? game.detail.data.home : game.detail.data.visitor} />-->
      <!--}-->
      <game-player :playerList="playerList" />
    </div>
  </div>
</template>

<script>
 import {mapGetters} from 'vuex'
 import teamMap from '../../utils/team-map'
 import gamePlayer from './game-player'
 import actions from '../../actions/game'
 import { XHeader } from 'vux'
 export default {
   name: 'game-detail',
   components: {
     gamePlayer, XHeader
   },
   data () {
     return {
       game: {
       },
       teamMapHome: {},
       teamMapVisitor: {},
       selectedIndex: 0,
       date: ['2015', '12', '25']
     }
   },
   created () {
     let id = this.$route.query.id
     this.game = this.live.concat(this.over).find((data) => {
       if (data.id === id) {
         return true
       }
       return false
     })

     actions.getGameDetail(this.game.id, this.game.type, this.date[0], this.date[1], this.date[2])
     let homeAbb = this.game.home.team.toLowerCase()
     let visitorAbb = this.game.visitor.team.toLowerCase()
     this.teamMapHome = teamMap[homeAbb]
     this.teamMapVisitor = teamMap[visitorAbb]
   },
   mounted () {
   },
   beforeUpdate () {
     if (this.game.type === 'live') {
       clearTimeout(this.timeout)
       this.timeout = setTimeout(() => {
         actions.getGameDetail(this.game.id, this.game.type, this.date[0], this.date[1], this.date[2])
       }, 5000)
     } else if (this.game.type === 'over') {
       //
     }
   },
   computed: {
     homeCss () {
       return this.selectedIndex === 0 ? 'Active' : 'Inactive'
     },
     visitorCss () {
       return this.selectedIndex === 1 ? 'Active' : 'Inactive'
     },
     homeStand () {
       if (this.standing.loaded && this.game.home) {
         const homeStandState = this.standing.data[this.game.home.id].state
         return homeStandState.wins + ' - ' + homeStandState.losses
       } else {
         return '-'
       }
     },
     visitorStand () {
       if (this.standing.loaded && this.game.visitor) {
         const visitorStandState = this.standing.data[this.game.visitor.id].state
         return visitorStandState.wins + '-' + visitorStandState.losses
       } else {
         return '-'
       }
     },
     playerList () {
       if (!this.game.detail.data.home) {
         return []
       }
       if (this.selectedIndex === 0) {
         return this.game.detail.data.home.player
       } else {
         return this.game.detail.data.visitor.player
       }
     },
     gameProcess () {
       switch (this.game.type) {
         case 'live':
           return this.game.process.quarter + ' ' + this.game.process.time.replace(/\s+/, '')
         case 'over':
           return 'Final'
         default:
       }
       return ''
     },
     cssType () {
       switch (this.game.type) {
         case 'live':
           return 'Live'
         case 'over':
           return 'Over'
       }
       return ''
     },
     ...mapGetters(['live', 'over', 'standing'])
   },
   methods: {
     back () {
       this.$router.go(-1)
     }
   }
}
</script>
<style>
  .game-detail-nav {
    height: 40px;
    padding-top: 5px;
    padding-left: 5px;
  }
  .game-detail-backNav {
    /*height: 40px;
    position: relative;
    left: -8px;
    width: 50px;*/
    fill:#fff;position:relative;top:-8px;left:-3px;
  }
  .game-detail-sumContainer {
    display: flex;
    flex: 5;
    flex-direction: row;
  }
  .game-detail-team {
    align-items: center;
    flex: 1;
    text-align: center;
  }
  .game-detail-teamLogo {
    width: 75px;
    height: 75px;
  }
  .game-detail-teamCity {
    color: #fff;
    /*font-size: 11px;*/
    font-size: 12px;
    transform-origin: 0px bottom 0px;
    transform: scale(0.95);
    margin-top: 2px;
  }
  .game-detail-teamName {
    color: #fff;
    font-weight: bold;
    font-size: 13px;
    position: relative;
    top: 0
  }
  .game-detail-standing {
    color: #fff;
    margin-top: 5px;
  }

  .game-detail-gameInfo {
    align-items: center;
    flex: 1.5;
    flex-direction: column;
  }
  .game-detail-infoProcess {
    color: #fff;
    font-size: 13px;
    margin-top: 18px;
    margin-bottom: 3px;
  }
  .game-detail-processUnstart {
    font-size: 19px;
    position: relative;
    top: 9px;
  }
  .game-detail-infoScorePanel {
    flex: 1;
    flex-direction: row;
    display: flex;
  }
  .game-detail-infoScoreBlock {
    align-items: center;
    flex: 1;
    width: 60px;
  }
  .game-detail-infoScore {
    align-self: center;
    color: #fff;
    font-weight: 200;
    flex: 9;
    font-size: 35px;
    text-align: center;
  }
  .game-detail-infoSide {
    align-self: center;
    color: rgba(255, 255, 255, 0.5);
    /*font-size: 10px;*/
    font-size: 12px;
    transform-origin: 0px bottom 0px;
    transform: scale(0.83);
    flex: 1;
    margin-top: 6px;
    text-align: center;
  }
  .game-detail-infoDivider {
    /* flex: 1;*/
    background-color: rgba(255, 255, 255, 0.3);
    margin-top: 7px;
    margin-left: 15px;
    margin-right: 15px;
    width: 1px;
    height: 55px;
  }
  .game-detail-segment {
    height: 35px;
    flex-direction: row;
    display: flex;
  }
  .game-detail-segPanel {
    flex: 1;
  }
  .game-detail-segPanelActive {
    background-color: #fff;
  }
  .game-detail-segPanelInactive {
    background-color: #EBEBEB;
  }
  .game-detail-segPanelInner {
    flex-direction: column;
    flex: 1;
    display: flex;
  }
  .game-detail-segTeam {
    align-self: center;
    flex: 1;
    font-size: 12px;
    line-height: 22px;
  }
  .game-detail-segTeamActive {
    color: #222;
  }
  .game-detail-segTeamInactive {
    color: #7F7F7F;
  }

  .game-detail-indicatorView {
    flex: 13;
    flex-direction: column;
  }
  .game-detail-indicator {
    align-self: center;
    height: 36px;
    justify-content: center;
    position: relative;
    top: 100px;
  }
</style>
