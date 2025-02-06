// React
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {APIProvider} from '@vis.gl/react-google-maps';

//import './index.css'
import App from './App.tsx'
import { ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

const GOOGLE_MAP_KEY : string = import.meta.env.VITE_GOOGLE_API_KEY || "";

const client : ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: "http://94.131.97.245:4000/graphql",
  cache: new InMemoryCache()
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <APIProvider apiKey={GOOGLE_MAP_KEY} onLoad={() => console.log('Maps API has loaded.')}>
        <App />
      </APIProvider>
    </ApolloProvider>
  </StrictMode>,
)
