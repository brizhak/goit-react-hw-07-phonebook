import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://6500459418c34dee0cd49ffa.mockapi.io';

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
  async ({ id, name, number }, thunkApi) => {
    try {
      const { data } = await axios.post('/contacts', {
        id,
        name,
        number,
      });
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkApi) => {
    try {
      await axios.delete('/contacts/{id}');
      return id;
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
    setFilteredContacts(state, action) {
      const filterQuery = action.payload.toLowerCase();
      if (filterQuery === '') {
        state.contacts.items = state.originalContacts;
      } else {
        state.contacts.items = state.originalContacts.filter(contact =>
          contact.name.toLowerCase().includes(filterQuery)
        );
      }
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setNumber(state, action) {
      state.number = action.payload;
    },
    // addContact(state, action) {
    //   state.contacts.items.push(action.payload);
    //   state.originalContacts.push(action.payload);
    // },
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
        state.originalContacts = action.payload;
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
  // deleteContact,
  // addContact,
} = contactsSlice.actions;
export const selectName = state => state.contacts.name;
export const selectNumber = state => state.contacts.number;
export const selectContacts = state => state.contacts.contacts.items;
export const contactsReducer = contactsSlice.reducer;
export const selectIsLoading = state => state.contacts.contacts.isLoading;
