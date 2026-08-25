import { ApolloProvider } from '@apollo/client/react';

import { BusinessCardPage } from './business-card-page';
import { apolloClient } from '@/lib/apollo-client';

export function App(): React.JSX.Element {
  return (
    <ApolloProvider client={apolloClient}>
      <BusinessCardPage />
    </ApolloProvider>
  );
}
