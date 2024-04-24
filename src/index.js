import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClientProvider, QueryClient } from 'react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        cacheTime: 1000 * 60 * 60 * 24,
        staleTime: Infinity
      },
    },
  })

root.render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);

