// React
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { APIProvider } from '@vis.gl/react-google-maps';

// Apollo 
import { ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

// Components
import App from './App.tsx';

// Redux
import store from './app/store'
import { Provider } from 'react-redux'

const GOOGLE_MAP_KEY: string = import.meta.env.VITE_GOOGLE_API_KEY || "";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({  
  //uri: "http://94.131.97.245:4000/graphql",
  uri: window.location.host.includes("localhost") ? "http://localhost:4000/graphql" : "http://94.131.97.245:4000/graphql",
  cache: new InMemoryCache()
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <APIProvider apiKey={GOOGLE_MAP_KEY} onLoad={() => console.log('Maps API has loaded.')}>
          <App />
        </APIProvider>
      </ApolloProvider>
    </Provider>
  </StrictMode>,
)
