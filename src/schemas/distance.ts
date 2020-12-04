import { gql } from "apollo-server";

export default gql`
  # Scalars
  scalar Date

  # Custom Types
  type Port {
    id: ID!
    code: String!
    countryCode: String!
    name: String!
    latGeodetic: Float!
    lon: Float!
    aliases: [String!]
    locode: String!
  }

  type DistanceBetweenPorts {
    id: ID!
    port1: String!
    port2: String!
    antiPiracy: Boolean!
    eca: Boolean!
    distance: Distance!
    suezClosedDistance: Float!
    suezRoute: Boolean!
    fromAPI: Boolean!
    verified: Boolean!
  }

  type Distance {
    id: ID!
    value: Float!
    unit: String!
  }

  # Custom Inputs
  input PortInput {
    id: ID!
    code: String!
    countryCode: String!
    name: String!
    latGeodetic: Float!
    lon: Float!
    aliases: [String!]
    locode: String!
  }

  input DistanceBetweenPortsInput {
    id: ID!
    port1: String!
    port2: String!
    antiPiracy: Boolean!
    eca: Boolean!
    distance: DistanceInput
    suezClosedDistance: Float
    suezRoute: Boolean
    fromAPI: Boolean
    verified: Boolean
  }

  input DistanceInput {
    id: ID!
    value: Float!
    unit: String!
  }

  # input PersonInput {
    # id: ID # if known, otherwise one will be generated
    # name: String
    # givenName: String
    # familyName: String
    # dateOfBirth: Date
  # }

  # Query Root
  type Query {
    distanceInfo: String

    allPortsFromAPI: [Port!]

    checkDistanceBetweenPortsAPI(
        originName: String,
        destinationName: String,
        antiPiracy: Boolean,
        eca: Boolean

    ): Boolean!

    queryDistanceIfIDNull(
        id: ID,
        originName: String,
        destinationName: String,
        antiPiracy: Boolean,
        eca: Boolean
    ): DistanceBetweenPorts

    handleMissingDistance(
        id: ID,
        distance: DistanceBetweenPortsInput
    ): DistanceBetweenPorts

    addDistanceToCacheAndDBIfIDNull(
        id: ID,
        distance: DistanceBetweenPortsInput
    ): DistanceBetweenPorts

    removeRedundantDistanceInfo(
        distance: DistanceBetweenPortsInput
    ): Distance

  }

  # Mutation Root
  # type Mutation {
    # Custom mutations
    # addPerson(input: PersonInput): ID
    # updatePerson(input: PersonInput): ID
    # deletePerson(id: ID!): Person
  # }

  # Custom Event Types
  # type PersonEvent {
    # id: ID
    # name: String
    # givenName: String
    # familyName: String
    # dateOfBirth: Date
  # }

  # Subscription Root
  # type Subscription {
    # Custom events
    # personAdded: PersonEvent!
    # personUpdated: PersonEvent!
    # personDeleted: PersonEvent!
  # }
`;
