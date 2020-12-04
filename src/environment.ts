import { config } from "dotenv";

config();

interface Environment {
  apollo: {
    introspection: boolean;
    playground: boolean;
  };
  port: number | string;
  serviceId: string;
  outgoingConnectionTimeout: number;
  maxQueryResults: number;
}

export const environment: Environment = {
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION === "true",
    playground: process.env.APOLLO_PLAYGROUND === "true"
  },
  port: process.env.PORT!,
  serviceId: process.env.SERVICE_ID!,
  outgoingConnectionTimeout: parseInt(process.env.OUTGOING_CONNECTION_TIMEOUT!),
  maxQueryResults: parseInt(process.env.MAX_QUERY_RESULTS!)
};
