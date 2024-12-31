import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Contact {
    id: ID!
    name: String!
    email: String!
    phone: String!
  }

  type User {
    id: ID!
    username: String!
  }

  type Query {
    contacts: [Contact!]!
    contact(id: ID!): Contact
  }

  type Mutation {
    addContact(name: String!, email: String!, phone: String!): Contact!
    updateContact(id: ID!, name: String, email: String, phone: String): Contact!
    deleteContact(id: ID!): Boolean!
  }
`;

export default typeDefs;