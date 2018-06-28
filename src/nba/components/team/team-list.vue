<template>
  <div>
    <div class="team-list-container">
      <div style="position: relative;height: 100px;z-index: 10;">
        <div class="team-list-header">
          <div class="team-list-conference">{{conference.toUpperCase()}}</div>
          <div class="team-list-confLabel">conference</div>
        </div>
      </div>
      <!--<tabber :select="2">-->
      <!--</tabber>-->
      <div style="height: 44px;"></div>

      <collection v-if="team.loaded" @scroll="scrollEnd">
        <team-conference :teams="team.data.western" />
        <team-conference :teams="team.data.eastern" />
      </collection>
    </div>
  </div>

</template>

<script>
 import {mapGetters} from 'vuex'
 import collection from '../common/collection'
 import teamConference from '../team/team-conference'
 import actions from '../../actions/team'
 import moment from 'moment-timezone'
 export default {
   name: 'team-list',
   components: {
     collection, teamConference
   },
   data () {
     return {
       conference: 'western'
     }
   },
   computed: {
     ...mapGetters(['team'])
   },
   created () {
   },
   mounted () {
     const dateString = moment.tz(Date.now(), 'America/Los_Angeles').format()
     let dateArray = dateString.replace('T', '-').split('-')
     dateArray = dateArray.splice(0, 3)
     // let dateArray = ['2015', '12', '25']
     actions.getTeamRank(dateArray[0], dateArray[1], dateArray[2])
   },
   methods: {
     scrollEnd (tab) {
       if (tab === 0) {
         this.conference = 'western'
       } else {
         this.conference = 'eastern'
       }
     }
   }
}
</script>
<style>
  .team-list-container {
    flex: 1;
  }

  .team-list-header {
    background-color: #2DB43D;
    height: 100px;
    justify-content: center;
    padding: 0 20px;
    position: fixed;
    width: 100vw;
    display: flex;
    flex-direction: column;
  }
  .team-list-conference {
    color: #fff;
    font-size: 25px;
    font-weight: 300;
  }
  .team-list-confLabel {
    color: #fff;
    font-size: 14px;
    font-weight: 200;
  }
</style>
