import { gql } from 'apollo-server-express';

const typedefs = gql`
  type User {
    _id: ID!
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user(email: String!): User
  }

  type Mutation {
    addUser(email: String!, password: String!): Auth
    deleteUser(email: String!, password: String!): ID
    login(email: String!, password: String!): Auth
  }
`;

export default typedefs;
