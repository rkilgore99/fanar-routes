import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql";
import { Context } from "../main";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Distance = {
  __typename?: "Distance";
  id: Scalars["ID"];
  value: Scalars["Float"];
  unit: Scalars["String"];
};

export type DistanceBetweenPorts = {
  __typename?: "DistanceBetweenPorts";
  id: Scalars["ID"];
  port1: Scalars["String"];
  port2: Scalars["String"];
  antiPiracy: Scalars["Boolean"];
  eca: Scalars["Boolean"];
  distance: Distance;
  suezClosedDistance: Scalars["Float"];
  suezRoute: Scalars["Boolean"];
  fromAPI: Scalars["Boolean"];
  verified: Scalars["Boolean"];
};

export type DistanceBetweenPortsInput = {
  id: Scalars["ID"];
  port1: Scalars["String"];
  port2: Scalars["String"];
  antiPiracy: Scalars["Boolean"];
  eca: Scalars["Boolean"];
  distance?: Maybe<DistanceInput>;
  suezClosedDistance?: Maybe<Scalars["Float"]>;
  suezRoute?: Maybe<Scalars["Boolean"]>;
  fromAPI?: Maybe<Scalars["Boolean"]>;
  verified?: Maybe<Scalars["Boolean"]>;
};

export type DistanceInput = {
  id: Scalars["ID"];
  value: Scalars["Float"];
  unit: Scalars["String"];
};

export type Info = {
  __typename?: "Info";
  id: Scalars["ID"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
};

export type Port = {
  __typename?: "Port";
  id: Scalars["ID"];
  code: Scalars["String"];
  countryCode: Scalars["String"];
  name: Scalars["String"];
  latGeodetic: Scalars["Float"];
  lon: Scalars["Float"];
  aliases?: Maybe<Array<Scalars["String"]>>;
  locode: Scalars["String"];
};

export type PortInput = {
  id: Scalars["ID"];
  code: Scalars["String"];
  countryCode: Scalars["String"];
  name: Scalars["String"];
  latGeodetic: Scalars["Float"];
  lon: Scalars["Float"];
  aliases?: Maybe<Array<Scalars["String"]>>;
  locode: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  addDistanceToCacheAndDBIfIDNull?: Maybe<DistanceBetweenPorts>;
  allPortsFromAPI?: Maybe<Array<Port>>;
  checkDistanceBetweenPortsAPI: Scalars["Boolean"];
  distanceInfo?: Maybe<Scalars["String"]>;
  handleMissingDistance?: Maybe<DistanceBetweenPorts>;
  info?: Maybe<Info>;
  queryDistanceIfIDNull?: Maybe<DistanceBetweenPorts>;
  removeRedundantDistanceInfo?: Maybe<Distance>;
};

export type QueryaddDistanceToCacheAndDBIfIDNullArgs = {
  id?: Maybe<Scalars["ID"]>;
  distance?: Maybe<DistanceBetweenPortsInput>;
};

export type QuerycheckDistanceBetweenPortsAPIArgs = {
  originName?: Maybe<Scalars["String"]>;
  destinationName?: Maybe<Scalars["String"]>;
  antiPiracy?: Maybe<Scalars["Boolean"]>;
  eca?: Maybe<Scalars["Boolean"]>;
};

export type QueryhandleMissingDistanceArgs = {
  id?: Maybe<Scalars["ID"]>;
  distance?: Maybe<DistanceBetweenPortsInput>;
};

export type QueryqueryDistanceIfIDNullArgs = {
  id?: Maybe<Scalars["ID"]>;
  originName?: Maybe<Scalars["String"]>;
  destinationName?: Maybe<Scalars["String"]>;
  antiPiracy?: Maybe<Scalars["Boolean"]>;
  eca?: Maybe<Scalars["Boolean"]>;
};

export type QueryremoveRedundantDistanceInfoArgs = {
  distance?: Maybe<DistanceBetweenPortsInput>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  DistanceBetweenPortsInput: DistanceBetweenPortsInput;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  DistanceInput: DistanceInput;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  DistanceBetweenPorts: ResolverTypeWrapper<DistanceBetweenPorts>;
  Distance: ResolverTypeWrapper<Distance>;
  Port: ResolverTypeWrapper<Port>;
  Info: ResolverTypeWrapper<Info>;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  PortInput: PortInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  ID: Scalars["ID"];
  DistanceBetweenPortsInput: DistanceBetweenPortsInput;
  String: Scalars["String"];
  Boolean: Scalars["Boolean"];
  DistanceInput: DistanceInput;
  Float: Scalars["Float"];
  DistanceBetweenPorts: DistanceBetweenPorts;
  Distance: Distance;
  Port: Port;
  Info: Info;
  Date: Scalars["Date"];
  PortInput: PortInput;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export type DistanceResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Distance"] = ResolversParentTypes["Distance"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  value?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  unit?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DistanceBetweenPortsResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["DistanceBetweenPorts"] = ResolversParentTypes["DistanceBetweenPorts"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  port1?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  port2?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  antiPiracy?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  eca?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  distance?: Resolver<ResolversTypes["Distance"], ParentType, ContextType>;
  suezClosedDistance?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  suezRoute?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  fromAPI?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  verified?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InfoResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Info"] = ResolversParentTypes["Info"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PortResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Port"] = ResolversParentTypes["Port"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  code?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  countryCode?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  latGeodetic?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  lon?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  aliases?: Resolver<Maybe<Array<ResolversTypes["String"]>>, ParentType, ContextType>;
  locode?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  addDistanceToCacheAndDBIfIDNull?: Resolver<
    Maybe<ResolversTypes["DistanceBetweenPorts"]>,
    ParentType,
    ContextType,
    RequireFields<QueryaddDistanceToCacheAndDBIfIDNullArgs, never>
  >;
  allPortsFromAPI?: Resolver<Maybe<Array<ResolversTypes["Port"]>>, ParentType, ContextType>;
  checkDistanceBetweenPortsAPI?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<QuerycheckDistanceBetweenPortsAPIArgs, never>
  >;
  distanceInfo?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  handleMissingDistance?: Resolver<
    Maybe<ResolversTypes["DistanceBetweenPorts"]>,
    ParentType,
    ContextType,
    RequireFields<QueryhandleMissingDistanceArgs, never>
  >;
  info?: Resolver<Maybe<ResolversTypes["Info"]>, ParentType, ContextType>;
  queryDistanceIfIDNull?: Resolver<
    Maybe<ResolversTypes["DistanceBetweenPorts"]>,
    ParentType,
    ContextType,
    RequireFields<QueryqueryDistanceIfIDNullArgs, never>
  >;
  removeRedundantDistanceInfo?: Resolver<
    Maybe<ResolversTypes["Distance"]>,
    ParentType,
    ContextType,
    RequireFields<QueryremoveRedundantDistanceInfoArgs, never>
  >;
};

export type Resolvers<ContextType = Context> = {
  Date?: GraphQLScalarType;
  Distance?: DistanceResolvers<ContextType>;
  DistanceBetweenPorts?: DistanceBetweenPortsResolvers<ContextType>;
  Info?: InfoResolvers<ContextType>;
  Port?: PortResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
