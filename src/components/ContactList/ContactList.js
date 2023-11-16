// components/ContactList.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact,  } from 'redux/contactSlice';

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);

  const handleDelete = (id) => {
    // Удаление контакта
    dispatch(deleteContact(id));
  };

  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>
          {contact.name}: {contact.phone}{' '}
          <button onClick={() => handleDelete(contact.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
