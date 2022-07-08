export const schema = gql`
  type MyClient {
    id: String!
    status: String!
    createdAt: DateTime!
    owner: String!
    fullname: String!
    email: String!
    phone: String!
    sales: [Sale]!
  }

  type Query {
    myClients: [MyClient!]! @requireAuth
    myClient(id: String!): MyClient @requireAuth
    myClientByOwner(id: String!, owner: String!): MyClient @requireAuth
    myClientsByOwner(owner: String!): [MyClient!]! @requireAuth
  }

  input CreateMyClientInput {
    status: String!
    owner: String!
    fullname: String!
    email: String!
    phone: String!
  }

  input UpdateMyClientInput {
    status: String
    fullname: String
    email: String
    phone: String
  }

  type Mutation {
    createMyClient(input: CreateMyClientInput!): MyClient! @requireAuth
    updateMyClient(id: String!, input: UpdateMyClientInput!): MyClient!
      @requireAuth
    updateMyClientByOwner(
      id: String!
      owner: String!
      input: UpdateMyClientInput
    ): MyClient! @requireAuth
    deleteMyClient(id: String!): MyClient! @requireAuth
  }
`;
