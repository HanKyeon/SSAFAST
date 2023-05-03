import Toast from '@/components/common/Toast';
import { persistor, wrapper } from '@/store';
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
import { useStoreSelector } from '@/hooks/useStore';
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
  const { store, props } = wrapper.useWrappedStore(rest);
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
              <Component {...props.pageProps}></Component>
            </Background>
          </PersistGate>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
};

// wrapper의 withRedux로 해도 되고, Provider로 감싸줘도 된다. 나는 감싸주려한다.
export default App;
