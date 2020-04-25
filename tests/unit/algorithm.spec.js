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
})
