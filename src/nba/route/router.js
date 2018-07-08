export const routes = {
  pre: '',
  path: '',
  list: [
    {
      name: 'game-index',
      path: '/index',
      components: {
        'main': resolve => require(['../components/game/game-list'], resolve)
      },
      meta: {keepAlive: true, tab: 0}
    },
    {
      name: 'game-detail',
      path: '/game-detail',
      component: (resolve) => require(['../components/game/game-detail'], resolve)
    },
    {
      name: 'player-index',
      path: '/player-index',
      components: {
        'main': resolve => require(['../components/player/player-index'], resolve)
      },
      meta: {keepAlive: true, tab: 1}
    },
    {
      name: 'player-detail',
      path: '/player-detail',
      component: (resolve) => require(['../components/player/player-detail'], resolve)
    },
    {
      name: 'team-list',
      path: '/team-list',
      components: {
        'main': resolve => require(['../components/team/team-list'], resolve)
      },
      meta: {keepAlive: true, tab: 2}
    },
    {
      name: 'team-detail',
      path: '/team-detail',
      component: (resolve) => require(['../components/team/team-detail'], resolve)
    }
  ]
}
