import Toast from '@/components/common/Toast';
import { wrapper } from '@/store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const App = function ({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            // useErrorBoundary: true,
            // enabled: true,
            // cacheTime: 10 * 60 * 1000,
            // staleTime: 10 * 60 * 1000,
            refetchOnWindowFocus: false,
          },
          mutations: {
            // useErrorBoundary: true,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <Component {...props.pageProps}></Component>
      </Provider>
    </QueryClientProvider>
  );
};

// wrapper의 withRedux로 해도 되고, Provider로 감싸줘도 된다. 나는 감싸주려한다.
export default App;
