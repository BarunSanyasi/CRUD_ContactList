import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CONTACTS } from '../graphql/queries';
import { contactState } from '../recoil/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

const ContactList: React.FC = () => {
    const {data, loading, error} = useQuery(GET_CONTACTS);
    const setContacts = useSetRecoilState(contactState);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (data?.getContents) {
            setContacts(data.getContents);
        }
    }, [data, setContacts]);

    const contacts = useRecoilValue(contactState);

    if (loading) return <p>Loading please wait..</p>
    if (error) return <p>Error: {error.message}</p>;
    
    if (!contacts || contacts.length === 0) {
        return <p>No contacts found.</p>;
    }
    
  return (
    <div>
        <h3>Contact List</h3>
        <ul>
            {contacts.map((contact) => (
                <li key={contact.id}>
                    {contact.name} - {contact.email}
                    <button onClick={() => navigate(`/edit/${contact.id}`)}>Edit</button>
                    <button onClick={() => {}}>Delete</button>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default ContactList;