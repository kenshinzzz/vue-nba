export const routes = {
  pre: '',
  path: '',
  list: [
    {
      name: 'game-index',
      path: '/index',
      component: (resolve) => require(['../components/game/game-list'], resolve),
      meta: {keepAlive: true}
    },
    {
      name: 'game-detail',
      path: '/game-detail',
      component: (resolve) => require(['../components/game/game-detail'], resolve)
    },
    {
      name: 'player-index',
      path: '/player-index',
      component: (resolve) => require(['../components/player/player-index'], resolve),
      meta: {keepAlive: true}
    },
    {
      name: 'player-detail',
      path: '/player-detail',
      component: (resolve) => require(['../components/player/player-detail'], resolve)
    },
    {
      name: 'team-list',
      path: '/team-list',
      component: (resolve) => require(['../components/team/team-list'], resolve),
      meta: {keepAlive: true}
    },
    {
      name: 'team-detail',
      path: '/team-detail',
      component: (resolve) => require(['../components/team/team-detail'], resolve)
    }
  ]
}
