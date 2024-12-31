import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_CONTACT } from '../graphql/mutations';
import { useSetRecoilState } from 'recoil';
import { contactState } from '../recoil/atoms';

const AddContact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addContact] = useMutation(ADD_CONTACT);
  const setContacts = useSetRecoilState(contactState);

  const handleAddContact = async () => {
    const { data } = await addContact({ variables: { name, email, phone } });
    setContacts((prev) => [...prev, data.addContact]);
  };

  return (
    <div>
      <h2>Add Contact</h2>
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
      <button onClick={handleAddContact}>Add</button>
    </div>
  );
};

export default AddContact;
