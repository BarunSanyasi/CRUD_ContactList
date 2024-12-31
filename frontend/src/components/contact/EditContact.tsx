import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { UPDATE_CONTACT, DELETE_CONTACT } from '../graphql/mutations';
import { useRecoilState } from 'recoil';
import { contactState } from '../recoil/atoms';

const EditContact: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contacts, setContacts] = useRecoilState(contactState);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [updateContact] = useMutation(UPDATE_CONTACT);
  const [deleteContact] = useMutation(DELETE_CONTACT);

  useEffect(() => {
    const contact = contacts.find((c) => c.id === parseInt(id!));
    if (contact) {
      setName(contact.name);
      setEmail(contact.email);
      setPhone(contact.phone);
    }
  }, [contacts, id]);

  const handleUpdateContact = async () => {
    try {
      const { data } = await updateContact({ variables: { id: parseInt(id!), name, email, phone } });
      setContacts((prev) => prev.map((c) => (c.id === data.updateContact.id ? data.updateContact : c)));
      navigate('/contacts');
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleDeleteContact = async () => {
    try {
      await deleteContact({ variables: { id: parseInt(id!) } });
      setContacts((prev) => prev.filter((c) => c.id !== parseInt(id!)));
      navigate('/contacts');
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div>
      <h2>Edit Contact</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleUpdateContact}>Update</button>
      <button onClick={handleDeleteContact}>Delete</button>
    </div>
  );
};

export default EditContact;
