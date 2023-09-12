import React, { useEffect } from 'react';
import style from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'components/Loader';
import Error from 'components/Error';
import {
  deleteContact,
  requestContacts,
  selectError,
  selectContacts,
  selectIsLoading,
} from 'redux/contactsSlice';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const handleDelete = e => {
    const idBtn = e.currentTarget.id;

    dispatch(deleteContact(idBtn));
  };
  useEffect(() => {
    dispatch(requestContacts());
  }, [dispatch]);
  return (
    <ul>
      {error !== null ? (
        <Error />
      ) : isLoading ? (
        <Loader />
      ) : (
        contacts &&
        contacts.map(contact => (
          <li key={contact.id}>
            <p>
              {contact.name} : {contact.number}
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
        ))
      )}
    </ul>
  );
};

export default ContactList;
