import { gql } from "@apollo/client";

export const GET_CONTACTS = gql`
  query GetContacts {
    getcontacts{
        id
        name
        email
        phone
    }
}
`;