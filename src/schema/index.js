import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
  type User {
    _id: ID!
    name: String!
  }

  type Query {
    allUsers: [User!]!
  }

  type Mutation {
    createUser(name: String!): User
  }
`

export default makeExecutableSchema({ typeDefs, resolvers })
