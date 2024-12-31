import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import { ApolloProvider } from '@apollo/client'
import { client } from './components/graphql/client.tsx'
import './index.css'
import App from './App.tsx'

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </RecoilRoot>
  </React.StrictMode>,
)
