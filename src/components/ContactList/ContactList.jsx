import React, { useEffect } from 'react';
import style from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteContact,
  requestContacts,
  selectContacts,
} from 'redux/contactsSlice';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleDelete = e => {
    const idBtn = e.currentTarget.id;

    dispatch(deleteContact(idBtn));
  };
  useEffect(() => {
    dispatch(requestContacts);
  });
  return (
    <ul>
      {contacts &&
        contacts.map(contact => (
          <li key={contact.id}>
            <p>
              {contact.name} : {contact.phone}
            </p>
            <button
              className={style.btn}
              type="button"
              id={contact.id}
              onClick={handleDelete}
            >
              Delete
            </button>
          </li>
        ))}
    </ul>
  );
};

export default ContactList;
