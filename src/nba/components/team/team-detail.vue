<template>
  <div>
    <div class="team-detail-container">

      <div v-if="mTeam">
        <div class="team-detail-navigation" :style="{backgroundColor: teamInfo.color}">
          <router-link to="/team-list">
            <i class="el-icon-arrow-left team-detail-backIcon"></i>
          </router-link>
        </div>

        <div class="team-detail-header" :style="{backgroundColor: teamInfo.color}">
          <div class="team-detail-headerTeam">
            <div class="team-detail-headerTeamCity">{{mTeam.teamCity}}</div>
            <div class="team-detail-headerTeamName">{{mTeam.teamName}}</div>
          </div>
          <div class="team-detail-headerLogo">
            <img class="team-detail-headerLogoImage" :src="teamInfo.logo" />
          </div>
          <div class="team-detail-headerRank">
            <div class="team-detail-headerRankResult">{{mTeam.win + 'W - ' + mTeam.loss + 'L' }}</div>
            <div class="team-detail-headerRankConf">{{'#' + mTeam.confRank + ' in the ' + mTeam.teamConf + ' Conference'}}</div>
            <div class="team-detail-headerRankDivi">{{'#' + mTeam.diviRank + ' in the ' + mTeam.teamDivi + ' Division'}}</div>
          </div>
        </div>

        <div class="team-detail-dataInfo">
          <div class="team-detail-dataInfoItem">
            <div class="team-detail-itemLabel">PPG</div>
            <div class="team-detail-itemData">{{mTeam.ptsRank}}th</div>
          </div>
          <div class="team-detail-dataInfoItem">
            <div class="team-detail-itemLabel">RPG</div>
            <div class="team-detail-itemData">{{mTeam.rebRank}}th</div>
          </div>
          <div class="team-detail-dataInfoItem">
            <div class="team-detail-itemLabel">APG</div>
            <div class="team-detail-itemData">{{mTeam.astRank}}th</div>
          </div>
          <div class="team-detail-dataInfoItem">
            <div class="team-detail-itemLabel">OPPG</div>
            <div class="team-detail-itemData">{{mTeam.oppRank}}th</div>
          </div>
        </div>

        <div v-if="mTeam.players" class="team-detail-listView" :style="{height: listHeight + 'px'}">
          <team-detail-player v-for="(player, index) in mTeam.players" :player="player" :isLast="index === mTeam.players.length" :team="mTeam" :key="index" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
 import actions from '../../actions/team'
 import {mapGetters} from 'vuex'
 import teamDetailPlayer from './team-detail-player'
 import teamMap from '../../utils/team-map'
 export default {
   data () {
     return {
       listHeight: 0
     }
   },
   components: {
     teamDetailPlayer
   },
   computed: {
     mTeam () {
       if (this.team.detail[this.id]) {
         return this.team.detail[this.id]
       } else {
         return {}
       }
     },
     teamInfo () {
       if (this.mTeam.teamAbbr) {
         return teamMap[this.mTeam.teamAbbr.toLowerCase()]
       } else {
         return {}
       }
     },
     ...mapGetters(['team'])
   },
   created () {
     this.id = this.$route.query.id
     actions.getTeamInfo(this.id)
      .then(() => {
        actions.getTeamDetail(this.id)
      })
   },
   mounted () {
     this.listHeight = document.documentElement.clientHeight - 30 - 90 - 35
   },
   methods: {
   }
}
</script>
<style>
  .team-detail-container {
    flex-direction: column;
    display: flex;
  }

  .team-detail-navigation {
    flex-direction: row;
    display: flex;
    height: 30px;
  }
  .team-detail-backIcon {
    height: 30px;
    margin-left: 2px;
    margin-top: 6px;
    width: 30px;
    color: #fff;
  }

  .team-detail-header {
    height: 90px;
    flex-direction: row;
    display: flex;
    padding: 0 10px 15px;
    align-items: center;
  }

  .team-detail-headerTeam {
    flex: 1.2;
    flex-direction: column;
    display: flex;
    justify-content: center;
  }
  .team-detail-headerTeamCity {
    color: #fff;
    font-size: 17px;
  }
  .team-detail-headerTeamName {
    color: #fff;
    font-size: 13px;
  }

  .team-detail-headerLogo {
    flex: .8;
    justify-content: center;
  }
  .team-detail-headerLogoImage {
    align-self: flex-start;
    height: 70px;
    width: 70px;
  }

  .team-detail-headerRank {
    flex: 1.5;
    justify-content: center;
  }
  .team-detail-headerRankResult {
    color: #fff;
    /*font-size: 10px;*/
    font-size: 12px;
    transform-origin: 0px bottom 0px;
    transform: scale(0.83);
  }
  .team-detail-headerRankConf {
    color: #fff;
    /*font-size: 10px;*/
    font-size: 12px;
    transform-origin: 0px bottom 0px;
    transform: scale(0.83);
    white-space: nowrap;
  }
  .team-detail-headerRankDivi {
    color: #fff;
    /*font-size: 10px;*/
    font-size: 12px;
    transform-origin: 0px bottom 0px;
    transform: scale(0.83);
  }

  .team-detail-dataInfo {
    align-items: center;
    flex-direction: row;
    display: flex;
    height: 35px;
  }
  .team-detail-dataInfoItem {
    align-items: flex-end;
    flex: 1;
    flex-direction: row;
    display: flex;
    justify-content: center;
  }
  .team-detail-itemLabel {
    color: #6B7C96;
    /*font-size: 10px;*/
    font-size: 12px;
    transform-origin: 0px bottom 0px;
    transform: scale(0.83);
  }
  .team-detail-itemData {
    color: #6B7C96;
    font-size: 15px;
    font-weight: 600;
    margin-left: 2px;
    position: relative;
    top: 2px;
  }

  .team-detail-listView {
    background-color: #F4F4F4;
  }
</style>
