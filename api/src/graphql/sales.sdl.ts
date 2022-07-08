export const schema = gql`
  type Sale {
    id: String!
    name: String!
    owner: String!
    clientOwnerId: String!
    myClient: MyClient!
    status: String!
    createdAt: DateTime!
  }

  type Query {
    sales: [Sale!]! @requireAuth
    sale(id: String!): Sale @requireAuth
  }

  input CreateSaleInput {
    name: String!
    owner: String!
    clientOwnerId: String!
    status: String!
  }

  input UpdateSaleInput {
    name: String
    owner: String
    clientOwnerId: String
    status: String
  }

  type Mutation {
    createSale(input: CreateSaleInput!): Sale! @requireAuth
    updateSale(id: String!, input: UpdateSaleInput!): Sale! @requireAuth
    deleteSale(id: String!): Sale! @requireAuth
  }
`;
