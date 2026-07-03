// UAAP match data for the Story beats. Extensible for the later elimination-
// round and finals beats. `sets` are [DLSU, opponent] per set.
// Photos: drop files at public/story/<file>.jpg; missing ones fall back to /hero.jpg.
export const matches = [
  {
    id: 'uaap87-finals-g2',
    season: 87,
    stage: 'Finals',
    game: 'Game 2',
    date: 'May 14, 2025',
    opponent: 'NU',
    result: 'loss', // 'win' | 'loss'
    sets: [
      [19, 25],
      [18, 25],
      [19, 25],
    ],
    note: 'NU goes on to secure back-to-back titles.',
    image: '/story/game2.jpg',
  },
]
