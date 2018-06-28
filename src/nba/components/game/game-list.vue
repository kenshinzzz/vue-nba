<template>
  <div>
    <div class="game-list-container">
      <div style="position: relative;height:100px;">
        <div class="game-list-header">
          <div class="game-list-calendar">
            <calendar class="game-list-calendarIcon" @on-change="onChange" title="" v-model="chooseDate" show-popup-header popup-header-title="Please select" disable-future>
              <i class="el-icon-date"></i>
            </calendar>
          </div>
          <div class="game-list-gameDate">{{date[0] + '-' + date[1] + '-' + date[2]}}</div>
          <div class="game-list-gameCount">{{gameCount + ' Games'}}</div>
        </div>
      </div>

      <!--<tabber :select="0">-->
      <!--</tabber>-->
      <div style="height: 44px;"></div>

      <div class="game-list-listView">
        <game-panel v-for="game in gameList" :key="game.id" :game="game"></game-panel>
      </div>
    </div>
  </div>

</template>

<script>
 import {mapGetters} from 'vuex'
 import gamePanel from './game-panel'
 import actions from '../../actions/game'
 import calendar from '../common/calendar'
 import moment from 'moment-timezone'

 export default {
   name: 'game-list',
   components: {
     calendar, gamePanel
   },
   data () {
     return {
       timeout: null,
       date: [0, 0, 0],
       isToday: false,
       chooseDate: ''
     }
   },
   created () {
     // this.gameList = this.live.concat(this.unstart.data).concat(this.over.data)
     // this.gameCount = this.live.length + this.unstart.length + this.over.length
     this.date = this.getToday()
     actions.getLeagueStanding()
   },
   computed: {
     gameCount () {
       return this.live.length + this.unstart.length + this.over.length
     },
     gameList () {
       return this.live.concat(this.unstart).concat(this.over)
     },
     ...mapGetters(['unstart', 'over', 'live'])
   },
   mounted () {
     actions.getGameGeneral(this.date[0], this.date[1], this.date[2])
   },
   beforeUpdate () {
     if (this.live.length > 0) {
       clearTimeout(this.timeout)
       this.timeout = setTimeout(() => {
         actions.getGameGeneral(this.date[0], this.date[1], this.date[2])
       }, 5000)
     } else if (this.unstart.length > 0) {
       clearTimeout(this.timeout)
       this.timeout = setTimeout(() => {
         actions.getGameGeneral(this.date[0], this.date[1], this.date[2])
       }, 120000)
     }
   },
   methods: {
     getToday () {
       const dateString = moment.tz(Date.now(), 'America/Los_Angeles').format()
       const dateArray = dateString.replace('T', '-').split('-')
       return dateArray.splice(0, 3)
       // return ['2015', '12', '25']
     },
     onChange (dateString) {
       console.log('on change', dateString)
       const dateArray = dateString.split('-')
       this.date = dateArray.splice(0, 3)
       actions.getGameGeneral(this.date[0], this.date[1], this.date[2])
     }
   }
}
</script>
<style>
  .game-list-container{
    flex: 1;
  }

  .game-list-header {
    background-color: #4D98E4;
    height: 100px;
    flex-direction: column;
    position: fixed;
    padding-left: 15px;
    width: 100vw;
  }

  .game-list-calendar {
    display: flex;
    flex-direction: column-reverse;
  }

  .game-list-calendarIcon {
    align-self: flex-end;
    height: 15px;
    margin-right: 15px;
    margin-top: 12px;
    width: 25px;
    color: #fff;
  }
  .game-list-gameDate{
    color: #fff;
    font-weight: 200;
    font-size: 25px;
  }
  .game-list-gameCount{
    color: #fff;
    font-weight: 200;
    font-size: 14px;
  }

  .game-list-listView {
    background-color: #fff;
    flex: 6;
    flex-direction: column;
    padding-top: 12px;
    padding-bottom: 10px;
  }
</style>
