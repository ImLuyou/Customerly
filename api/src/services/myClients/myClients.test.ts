import {
  myClients,
  myClient,
  createMyClient,
  updateMyClient,
  deleteMyClient,
} from './myClients'
import type { StandardScenario } from './myClients.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('myClients', () => {
  scenario('returns all myClients', async (scenario: StandardScenario) => {
    const result = await myClients()

    expect(result.length).toEqual(Object.keys(scenario.myClient).length)
  })

  scenario('returns a single myClient', async (scenario: StandardScenario) => {
    const result = await myClient({ id: scenario.myClient.one.id })

    expect(result).toEqual(scenario.myClient.one)
  })

  scenario('creates a myClient', async () => {
    const result = await createMyClient({
      input: {
        owner: 'String',
        fullname: 'String',
        email: 'String1691123',
        phone: 'String859155',
      },
    })

    expect(result.owner).toEqual('String')
    expect(result.fullname).toEqual('String')
    expect(result.email).toEqual('String1691123')
    expect(result.phone).toEqual('String859155')
  })

  scenario('updates a myClient', async (scenario: StandardScenario) => {
    const original = await myClient({ id: scenario.myClient.one.id })
    const result = await updateMyClient({
      id: original.id,
      input: { owner: 'String2' },
    })

    expect(result.owner).toEqual('String2')
  })

  scenario('deletes a myClient', async (scenario: StandardScenario) => {
    const original = await deleteMyClient({ id: scenario.myClient.one.id })
    const result = await myClient({ id: original.id })

    expect(result).toEqual(null)
  })
})
