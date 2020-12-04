import {
  //MutationResolvers,
  //PersonEventResolvers,
  //PersonResolvers,
  QueryResolvers,
  //SubscriptionResolvers
} from "./schemas/gen-types";

import { InfoResolver } from "./resolvers/info";
import { DistanceResolver } from "./resolvers/distance"

//import { PersonResolver } from "./resolvers/person";

/**
 * Aggregates the resolvers defined by graphql-code-gen from our GraphQL schema.
 *
 * Add interfaces here when they have been implemented in one of the
 * type-specific resolver files.
 */
interface Resolvers {
  //Person: PersonResolvers;
  //PersonEvent: PersonEventResolvers;
  Query: QueryResolvers;
  //Mutation: MutationResolvers;
  //Subscription: SubscriptionResolvers;
}

/**
 * Unpack the implementation of the interfaces into the top-level resolver object.
 */
export const resolvers: Resolvers = {
  //Person: { ...PersonResolver.Person },
  //PersonEvent: { ...PersonResolver.PersonEvent },
  Query: {
    ...InfoResolver.Query,
    ...DistanceResolver.Query
    //...PersonResolver.Query
  },
  //Mutation: {
    //...PersonResolver.Mutation
  //},
  //Subscription: {
    //...PersonResolver.Subscription
  //}
};
