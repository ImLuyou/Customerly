import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.SaleCreateArgs>({
  sale: {
    one: {
      data: {
        name: 'String',
        owner: 'String',
        myClient: { create: { owner: 'String', fullname: 'String' } },
      },
    },
    two: {
      data: {
        name: 'String',
        owner: 'String',
        myClient: { create: { owner: 'String', fullname: 'String' } },
      },
    },
  },
})

export type StandardScenario = typeof standard
