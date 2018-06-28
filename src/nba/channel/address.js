'use strict'
const urlData = '' // http://data.nba.com'
const urlStats = '' // http://stats.nba.com'
const d = new Date()
const currentMonth = d.getMonth() + 1
let season
if (currentMonth >= 10) {
  season = d.getFullYear().toString() + '-' + (d.getFullYear() + 1).toString().substring(2, 4)
} else {
  season = (d.getFullYear().toString() - 1) + '-' + d.getFullYear().toString().substring(2, 4)
}

const address = {
  /**
   * All game of the date
   * @params gameDate: {String} {Format: yearmonthdate}
   * @example gameDate: 20151125
   */
  gameGeneral: (gameDate) => {
    return `${urlData}/data/5s/json/cms/noseason/scoreboard/${gameDate}/games.json`
  },
  /**
   * Detail of a game in a specific date
   * @params gameDate: {String} {Format: yearmonthdate} & gameId: {String}
   * @example gameDate: 20151128 & gameId: 0021500239
   */
  gameDetail: (gameDate, gameId) => {
    return `${urlData}/data/10s/json/cms/noseason/game/${gameDate}/${gameId}/boxscore.json`
  },
  /**
   * Current league standing
   * @params year {String}
   * @example year: 2015
   */
  leagueStanding: (year) => {
    return `${urlData}/data/json/cms/${year}/league/standings.json`
  },

  playerList: () => {
    return `${urlStats}/stats/commonallplayers?IsOnlyCurrentSeason=0&LeagueID=00&Season=${season}`
  },

  playerInfo: (id) => {
    return `${urlStats}/stats/commonplayerinfo?LeagueID=00&PlayerID=${id}&SeasonType=Regular+Season`
  },

  playerLog: (id) => {
    return `${urlStats}/stats/playergamelog?LeagueID=00&PerMode=PerGame&PlayerID=${id}&Season=${season}&SeasonType=Regular+Season`
  },

 /**
  * @params gameDate month/date/year
  */
  teamRank: (gameDate) => {
    return `${urlStats}/stats/scoreboard?DayOffset=0&LeagueID=00&gameDate=${gameDate}`
  },

  teamInfo: (id) => {
    return `${urlStats}/stats/teaminfocommon?LeagueID=00&SeasonType=Regular+Season&TeamID=${id}&season=${season}`
  },

  teamDetail: (id) => {
    return `${urlStats}/stats/teamplayerdashboard?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PaceAdjust=N&PerMode=PerGame&Period=0&PlusMinus=N&Rank=N&Season=${season}&SeasonSegment=&SeasonType=Regular+Season&TeamID=${id}&VsConference=&VsDivision=`
  },

  teamDetailBasic: (id) => {
    return `${urlStats}/stats/commonteamroster?LeagueID=00&Season=${season}&TeamID=${id}`
  }
}

export default address
