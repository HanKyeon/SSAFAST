import Toast from '@/components/common/Toast';
import store, { persistor } from '@/store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistGate } from 'redux-persist/integration/react';
import Background from '@/components/common/Background';

export const QueryClientOption = {
  defaultOptions: {
    queries: {
      retry: 1,
      // useErrorBoundary: true,
      // enabled: true,
      cacheTime: 10000 * 60 * 5,
      staleTime: 10000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
    mutations: {
      // useErrorBoundary: true,
    },
  },
};

const App = function ({ Component, ...rest }: AppProps) {
  const [queryClient] = useState(() => new QueryClient(QueryClientOption));
  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV !== 'production' ? (
        <ReactQueryDevtools initialIsOpen={false} />
      ) : null}
      <Hydrate state={rest.pageProps.dehydratedState}>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <Toast />
            <Background>
              <Component {...rest.pageProps}></Component>
            </Background>
          </PersistGate>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
