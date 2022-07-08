import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.MyClientCreateArgs>({
  myClient: {
    one: {
      data: {
        owner: 'String',
        fullname: 'String',
        email: 'String1922204',
        phone: 'String7873399',
      },
    },
    two: {
      data: {
        owner: 'String',
        fullname: 'String',
        email: 'String8679400',
        phone: 'String2535527',
      },
    },
  },
})

export type StandardScenario = typeof standard
