import { gql } from "@apollo/client";


export const ADD_CONTACT = gql`
    mutation AddContact(
        $name: String!, 
        $email: String!,
        $phone: String!,
    ){
    addContact(name: $name, email: $email, phone: $phone){
        id
        name
        email
        phone
    }
}`;

export const UPDATE_CONTACT = gql`
    mutation UpdateContact($id: Int!, $name: String, $email: String, $phone: String) {
        updateContact(id: $id, name: $name, email: $email, phone: $phone) {
            id
            name
            email
            phone
        }
    }
`;
                  
export const DELETE_CONTACT = gql`
    mutation DeleteContact($id: Int!) {
        deleteContact(id: $id)
    }
`;