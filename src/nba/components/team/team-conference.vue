<template>
  <div>
    <div :style="{height: listHeight + 'px', width: '100vw'}">
      <div v-for="(team, index) in teamList" @click="selectTeam(team.id)">
        <div class="team-conference-item" :class="index%2 === 0 ? '' : 'team-conference-itemEven'">
          <div class="team-conference-order">
            <div class="team-conference-orderLabel">{{parseInt(index, 10) + 1}}</div>
          </div>
          <div class="team-conference-team">
            <div class="team-conference-teamCity">{{team.city}}</div>
            <div class="team-conference-teamName">{{team.team}}</div>
          </div>
          <div class="team-conference-standing">
            <div class="team-conference-standingLabel">{{team.loss + ' - ' + team.win}}</div>
          </div>
          <div class="team-conference-logo">
            <img class="team-conference-logoImage" :src="teamLogo(team)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import teamMap from '../../utils/team-map'
 export default {
   data () {
     return {
       teamMapById: {},
       listHeight: 0
     }
   },
   props: {
     teams: {
       type: Array
     }
   },
   computed: {
     teamList () {
       return this.teams.map((value) => {
         return Object.assign({}, this.teamMapById[value.id], value)
       })
     }
   },
   created () {
     for (let key in teamMap) {
       this.teamMapById[teamMap[key].id] = Object.assign({}, teamMap[key], {abbr: key})
     }
   },
   mounted () {
     this.listHeight = document.documentElement.clientHeight - 100 - 45
   },
   methods: {
     selectTeam (id) {
       this.$router.push({path: '/team-detail', query: {id: id}})
     },
     teamLogo (team) {
       return team.abbr === 'hou' ? teamMap[team.abbr].logo2 : teamMap[team.abbr].logo
     }
   }
}
</script>
<style>
  .team-conference-item {
    height: 70px;
    flex: 1;
    flex-direction: row;
    display: flex;
    align-items: center;
   }
  .team-conference-itemEven {
    background-color: #F4F4F4;
   }

  .team-conference-order {
    align-self: center;
    width: 50px;
   }
  .team-conference-orderLabel {
    color: #6B7C96;
    /*font-size: 11px;*/
    font-size: 12px;
    transform-origin: 0px bottom 0px;
    transform: scale(0.95);
    font-weight: bold;
    text-align: center;
   }

  .team-conference-team {
    flex: 5;
    justify-content: center;
   }
  .team-conference-teamCity {
    color: #6B7C96;
    font-size: 18px;
    font-weight: 200;
   }
  .team-conference-teamName {
    color: #909CAF;
    font-size: 13;
   }

  .team-conference-standing {
    align-self: center;
    flex: 3;
   }
  .team-conference-standingLabel {
    color: #6B7C96;
    text-align: right;
   }

  .team-conference-logo {
    align-self: center;
    flex: 3;
    text-align: center;
   }
  .team-conference-logoImage {
    align-self: center;
    height: 35px;
    width: 35px;
  }
</style>
