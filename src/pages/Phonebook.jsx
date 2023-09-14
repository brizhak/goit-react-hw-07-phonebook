import React from 'react';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import style from './Phonebook.module.css';

const Phonebook = () => {
  return (
    <div className={style.container}>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
};

export default Phonebook;
