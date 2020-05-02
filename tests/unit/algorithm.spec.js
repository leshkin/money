import { transfers } from '@/algorithm'

describe('algorithm module', () => {

  it('#transfers should calculate transfers', () => {
    let participants = [
      {
        id: 1,
        sum: 100,
        count: 1
      },
      {
        id: 2,
        sum: 50,
        count: 1
      },
      {
        id: 3,
        sum: 30,
        count: 1
      }
    ]

    expect(transfers(participants)).toEqual(
      {
        share: 60,
        sum: 180,
        transfers: [
          {from: 3, pay: 30, to: 1},
          {from: 2, pay: 10, to: 1},
        ]
      }
    )

    participants = [
      {
        id: 1,
        sum: 100,
        count: 1
      },
      {
        id: 2,
        sum: 50,
        count: 1
      },
      {
        id: 3,
        sum: 33,
        count: 1
      }
    ]

    expect(transfers(participants)).toEqual(
      {
        share: 61,
        sum: 183,
        transfers: [
          {from: 3, pay: 28, to: 1},
          {from: 2, pay: 11, to: 1},
        ]
      }
    )

    participants = [
      {
        id: 1,
        sum: 100,
        count: 1
      },
      {
        id: 2,
        sum: 50,
        count: 1
      },
      {
        id: 3,
        sum: 31,
        count: 1
      }
    ]

    expect(transfers(participants)).toEqual(
      {
        share: 60.33,
        sum: 181,
        transfers: [
          {from: 3, pay: 29, to: 1},
          {from: 2, pay: 10, to: 1},
        ]
      }
    )

    participants = [
      {
        id: 1,
        sum: 0,
        count: 1
      },
      {
        id: 2,
        sum: 50,
        count: 1
      }
    ]

    expect(transfers(participants)).toEqual(
      {
        share: 25,
        sum: 50,
        transfers: [
          {from: 1, pay: 25, to: 2}
        ]
      }
    )

    participants = [
      {
        id: 1,
        sum: 100,
        count: 1
      },
      {
        id: 2,
        sum: 50,
        count: 3
      },
      {
        id: 3,
        sum: 30,
        count: 1
      }
    ]

    expect(transfers(participants)).toEqual(
      {
        share: 36,
        sum: 180,
        transfers: [
          {from: 2, pay: 58, to: 1},
          {from: 3, pay: 6, to: 1},
        ]
      }
    )

    participants = [
      {
        id: 1,
        sum: 50,
        count: 1
      },
      {
        id: 2,
        sum: 50,
        count: 1
      }
    ]

    expect(transfers(participants)).toEqual(
      {
        share: 50,
        sum: 100,
        transfers: []
      }
    )
  })

  it('#transfers should calculate transfers for special cases', () => {
    let participants = [
      {
        id: 1,
        sum: 250,
        count: 1
      },
      {
        id: 2,
        sum: 750,
        count: 1
      },
      {
        id: 3,
        sum: 200,
        count: 1
      },
      {
        id: 4,
        sum: 600,
        count: 1
      },
      {
        id: 5,
        sum: 600,
        count: 1
      },
      {
        id: 6,
        sum: 600,
        count: 1
      }
    ]

    expect(transfers(participants)).toEqual(
      {
        sum: 3000,
        share: 500,
        transfers: [
          { from: 1, pay: 250, to: 2 },
          { from: 3, pay: 100, to: 4 },
          { from: 3, pay: 100, to: 5 },
          { from: 3, pay: 100, to: 6 }
        ]
      }
    )

    participants = [
      {
        id: 1,
        sum: 250,
        count: 1
      },
      {
        id: 2,
        sum: 750,
        count: 1
      },
      {
        id: 3,
        sum: 700,
        count: 1
      },
      {
        id: 4,
        sum: 300,
        count: 1
      },
      {
        id: 5,
        sum: 200,
        count: 1
      },
      {
        id: 6,
        sum: 600,
        count: 1
      },
      {
        id: 7,
        sum: 600,
        count: 1
      },
      {
        id: 8,
        sum: 600,
        count: 1
      }
    ]

    expect(transfers(participants)).toEqual(
      {
        sum: 4000,
        share: 500,
        transfers: [
          { from: 4, pay: 200, to: 3 },
          { from: 1, pay: 250, to: 2 },
          { from: 5, pay: 100, to: 6 },
          { from: 5, pay: 100, to: 7 },
          { from: 5, pay: 100, to: 8 }
        ]
      }
    )
  })
})
