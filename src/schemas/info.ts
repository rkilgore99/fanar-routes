import { gql } from "apollo-server";

export default gql`
  # Boilerplate
  type Info {
    id: ID!
    name: String!
    description: String
  }

  # Query Root
  extend type Query {
    # Boilerplate
    info: Info
  }
`;
