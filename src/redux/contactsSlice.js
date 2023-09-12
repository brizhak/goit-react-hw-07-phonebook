import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL =
  'https://6500459418c34dee0cd49ffa.mockapi.io/phonebook/contacts';

export const requestContacts = createAsyncThunk(
  'contacts/requestContacts',
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get('/contacts');

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkApi) => {
    try {
      await axios.post('/contacts', { name, number });
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const contactsInitialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  name: '',
  number: '',
  originalContacts: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    //   setContacts(state, action) {
    //     state.contacts = action.payload;
    //     state.originalContacts = action.payload;
    //   },
    //   setFilteredContacts(state, action) {
    //     const filterQuery = action.payload.toLowerCase();
    //     if (filterQuery === '') {
    //       state.contacts = state.originalContacts;
    //     } else {
    //       state.contacts = state.originalContacts.filter(contact =>
    //         contact.name.toLowerCase().includes(filterQuery)
    //       );
    //     }
    //   },
    //   deleteContact(state, action) {
    //     state.contacts = state.contacts.filter(
    //       post => post.id !== action.payload
    //     );
    //     state.originalContacts = state.contacts.filter(
    //       post => post.id !== action.payload
    //     );
    //   },
    //   addContact(state, action) {
    //     state.contacts.push(action.payload);
    //     state.originalContacts.push(action.payload);
    //   },
    setName(state, action) {
      state.name = action.payload;
    },
    setNumber(state, action) {
      state.number = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(requestContacts.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(requestContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })
      .addCase(requestContacts.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })
      .addCase(addContact.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items.push(action.payload);
        state.originalContacts.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      }),
});

export const {
  setName,
  setNumber,
  setContacts,
  setFilteredContacts,
  deleteContact,
  // addContact,
} = contactsSlice.actions;
export const selectName = state => state.contacts.name;
export const selectNumber = state => state.contacts.number;
export const selectContacts = state => state.contacts.contacts.items;
export const contactsReducer = contactsSlice.reducer;
