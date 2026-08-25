import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const graphqlUrl = import.meta.env.VITE_GRAPHQL_URL ?? 'http://localhost:3000/graphql';

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: graphqlUrl }),
});
