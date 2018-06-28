<template>
  <div>
    <div class="player-index-container">
      <div class="player-index-header">
        <div class="player-index-headerInner">
          <input
            class="player-index-textInput"
            placeholder="Find player"
            v-model="name"
            @input="onInput"
          />
          <div class="player-index-searchIconView">
            <i class="el-icon-search player-index-searchIcon"></i>
          </div>
        </div>
      </div>

      <!--<tabber :select="1">-->
      <!--</tabber>-->
      <div style="height: 44px;"></div>

      <div>
          <div class="player-index-panel" v-for="(player, index) in filterPlayerList" :key="index" @click="selectPlayer(player)">
            <div class="player-index-panelLeft">
              <div class="player-index-panelName">{{player.name}}</div>
              <div class="player-index-panelTeam">{{player.teamCity + ' ' + player.teamName}}</div>
            </div>
            <div class="player-index-panelRight">
              <i class="el-icon-arrow-right player-index-enterIcon"></i>
            </div>
          </div>
      </div>
    </div>
  </div>

</template>

<script>
 import {mapGetters} from 'vuex'
 import actions from '../../actions/player'

 export default {
   name: 'player-index',
   components: {
   },
   data () {
     return {
       /* playerList: [
         {
           name: 'curry',
           teamCity: 'King',
           teamName: 'Warrior'
         },
         {
           name: 'kobe',
           teamCity: 'Los',
           teamName: 'Lakers'
         }
       ], */
       name: '',
       search: '',
       inputDelay: null

     }
   },
   computed: {
     filterPlayerList () {
       if (!this.search) {
         return this.playerList.recent
       }
       const reg = new RegExp(this.search, 'i')
       const players = this.playerList.data.filter(player => {
         return reg.test(player.name)
       })
       return players
     },
     ...mapGetters(['playerList'])
   },
   created () {
   },
   mounted () {
     actions.getPlayerList()
      .then(() => {
        actions.getSearchRecord()
      })
   },
   methods: {
     onInput () {
       clearTimeout(this.inputDelay)
       this.inputDelay = setTimeout(() => {
         this.search = this.name
       }, 1500)
     },
     selectPlayer (player) {
       actions.setSearchRecord(player)
       this.$router.push({path: '/player-detail', query: {id: player.id}})
     }
   },
   beforeDestroy () {
     clearTimeout(this.inputDelay)
   }
}
</script>
<style>
  .player-index-container{
    flex: 1;
  }

  .player-index-header{
    align-items: center;
    background-color: #E66840;
    flex-direction: row;
    height: 100px;
    display: flex;
  }
  .player-index-headerInner{
    flex: 1;
    flex-direction: row;
    justify-content: center;
    display: flex;
  }
  .player-index-textInput{
    background-color: #BD4C29;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
    height: 40px;
    padding: 0 5px;
    width: 260px;
    border-width: 0;
  }
  .player-index-searchIconView{
    background-color: #BD4C29;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    height: 40px;
    left: -5px;
    position: relative;
    width: 40px;
  }
  .player-index-searchIcon{
    width: 16px;
    height: 16px;
    left: 20px;
    margin-left: -8px;
    margin-top: -8px;
    position: absolute;
    top: 20px;
    color: #fff;
  }

  .player-index-list{
    flex: 1;
  }
  .player-index-panel{
    border-color: #979797;
    border-bottom-width: 1px;
    height: 65px;
    flex-direction: row;
    display: flex;
    align-items: center;
  }
  .player-index-panelLeft{
    flex: 1px;
    padding-left: 10px;
    justify-content: center;
  }
  .player-index-panelName{
    color: #6B7C96;
    font-size: 17px;
  }
  .player-index-panelTeam{
    color: #909CAF;
    font-size: 13px;
  }
  .player-index-panelRight{
    /* height: 65px;
    position: relative;
    width: 30px; */
  }
  .player-index-enterIcon{
    /* height: 30px;
    left: 15px;
    margin-left: -15px;
    margin-top: -15px;
    position: absolute;
    top: 32.5px; */
    width: 30px;
    color: #6B7C96;
  }
</style>
