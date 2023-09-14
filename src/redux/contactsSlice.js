import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from './authReducer';
import Notiflix from 'notiflix';

export const requestContacts = createAsyncThunk(
  'contacts/requestContacts',
  async (_, thunkApi) => {
    try {
      const { data } = await instance.get('contacts');

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
      const { data } = await instance.post('/contacts', {
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
  async (id, thunkAPI) => {
    try {
      const response = await instance.delete(`/contacts/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const contactsInitialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
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
  },
  extraReducers: builder =>
    builder
      .addCase(requestContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
        state.originalContacts = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items.push(action.payload);
        state.originalContacts.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = state.contacts.items.filter(
          contact => contact.id !== action.payload.id
        );
        state.originalContacts = state.contacts.items;
      })
      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.contacts.isLoading = true;
          state.contacts.error = null;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.contacts.isLoading = false;
          state.contacts.error = action.payload;
          Notiflix.Notify.failure('Something went wrong. Please try again!');
        }
      ),
});

export const { setFilteredContacts } = contactsSlice.actions;
export const selectContacts = state => state.contacts.contacts.items;
export const selectIsLoading = state => state.contacts.contacts.isLoading;
export const selectError = state => state.contacts.contacts.error;
export const contactsReducer = contactsSlice.reducer;
