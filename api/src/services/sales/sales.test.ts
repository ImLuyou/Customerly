import { sales, sale, createSale, updateSale, deleteSale } from './sales'
import type { StandardScenario } from './sales.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('sales', () => {
  scenario('returns all sales', async (scenario: StandardScenario) => {
    const result = await sales()

    expect(result.length).toEqual(Object.keys(scenario.sale).length)
  })

  scenario('returns a single sale', async (scenario: StandardScenario) => {
    const result = await sale({ id: scenario.sale.one.id })

    expect(result).toEqual(scenario.sale.one)
  })

  scenario('creates a sale', async (scenario: StandardScenario) => {
    const result = await createSale({
      input: {
        name: 'String',
        owner: 'String',
        clientOwnerId: scenario.sale.two.clientOwnerId,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.owner).toEqual('String')
    expect(result.clientOwnerId).toEqual(scenario.sale.two.clientOwnerId)
  })

  scenario('updates a sale', async (scenario: StandardScenario) => {
    const original = await sale({ id: scenario.sale.one.id })
    const result = await updateSale({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a sale', async (scenario: StandardScenario) => {
    const original = await deleteSale({ id: scenario.sale.one.id })
    const result = await sale({ id: original.id })

    expect(result).toEqual(null)
  })
})
