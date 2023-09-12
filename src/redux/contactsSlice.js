import { createSlice } from '@reduxjs/toolkit';

const contactsInitialState = {
  contacts: [],
  name: '',
  number: '',
  originalContacts: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    setContacts(state, action) {
      state.contacts = action.payload;
      state.originalContacts = action.payload;
    },
    setFilteredContacts(state, action) {
      const filterQuery = action.payload.toLowerCase();
      if (filterQuery === '') {
        state.contacts = state.originalContacts;
      } else {
        state.contacts = state.originalContacts.filter(contact =>
          contact.name.toLowerCase().includes(filterQuery)
        );
      }
    },
    deleteContact(state, action) {
      state.contacts = state.contacts.filter(
        post => post.id !== action.payload
      );
      state.originalContacts = state.contacts.filter(
        post => post.id !== action.payload
      );
    },
    addContact(state, action) {
      state.contacts.push(action.payload);
      state.originalContacts.push(action.payload);
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setNumber(state, action) {
      state.number = action.payload;
    },
  },
});

export const {
  setName,
  setNumber,
  setContacts,
  setFilteredContacts,
  deleteContact,
  addContact,
} = contactsSlice.actions;
export const selectName = state => state.contacts.name;
export const selectNumber = state => state.contacts.number;
export const selectContacts = state => state.contacts.contacts;
export const contactsReducer = contactsSlice.reducer;
