import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
    uri: 'http://5432/graphql',
    cache: new InMemoryCache(),
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}` || '',
    }
})