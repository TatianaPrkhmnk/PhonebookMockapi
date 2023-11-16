// components/ContactForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { addContact } from './contactSlice';
import {addContact} from 'redux/contactSlice'

function ContactForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Добавление контакта
    dispatch(addContact({ name, phone }));

    // Очистка формы после добавления
    setName('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Phone:
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </label>
      <button type="submit">Add Contact</button>
    </form>
  );
}

export default ContactForm;
