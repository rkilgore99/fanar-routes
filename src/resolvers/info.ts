import { QueryResolvers } from "../schemas/gen-types";
import { environment } from "../environment";

/**
 * graphql-code-gen generates resolvers for each Type in the GraphQL schema.
 * Here we aggregate the interfaces for Info resolved within this file, along
 * with the common Query Type.
 *
 * When an interface is added here, it also needs to be added in the top-level
 * file, resolvers.ts.
 */
interface Resolvers {
  Query: QueryResolvers;
}

export const InfoResolver: Resolvers = {
  Query: {
    info: () => {
      return {
        id: environment.serviceId,
        name: environment.serviceId,
        description: "Maana Q Knowledge Service template"
      };
    }
  }
};
