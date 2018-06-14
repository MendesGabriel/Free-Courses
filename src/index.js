import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { register } from './registerServiceWorker';
import Container from './containers/container';
import ContextProvider from './contexts';

// style
import './index.scss';

// libs
import './../node_modules/font-awesome/css/font-awesome.min.css';
import './../node_modules/flag-icon-css/css/flag-icon.min.css';


const httpLink = new HttpLink({ uri: 'http://localhost:4000' });

// 3
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});


register();

ReactDOM.render(
  <ApolloProvider client={client}>
    <ContextProvider>
      <Container />
    </ContextProvider>
  </ApolloProvider>
  , document.getElementById('app')
);
