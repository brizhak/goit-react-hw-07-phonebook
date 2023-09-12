import React from 'react';
import style from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  selectContacts,
  selectName,
  selectNumber,
  setName,
  setNumber,
} from 'redux/contactsSlice';
import { nanoid } from 'nanoid';

const ContactForm = () => {
  const name = useSelector(selectName);
  const number = useSelector(selectNumber);
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleAddContact = (name, number) => {
    const id = nanoid();

    const existingContact = contacts.find(
      contact => contact.name === name.toLowerCase()
    );

    if (existingContact) {
      alert(`Contact with the name "${name}" already exists.`);
      return;
    }

    dispatch(addContact({ id, name, number }));
  };

  const onSubmitForm = e => {
    e.preventDefault();
    handleAddContact(name, number);
    dispatch(setName(''));
    dispatch(setNumber(''));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      dispatch(setName(value));
    } else if (name === 'number') {
      dispatch(setNumber(value));
    }
  };

  return (
    <form onSubmit={onSubmitForm}>
      <label>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          placeholder="Enter name"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </label>

      <label>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          placeholder="Enter phone number"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </label>

      <button type="submit" className={style.btn}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
