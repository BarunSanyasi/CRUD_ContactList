import axios from 'axios';

export const executeGraphQLQuery = async (query: string, variables?: any) => {
    const response = await axios.post('/graphql', {
      query,
      variables,
    });
  
    return response.data;
  };
  