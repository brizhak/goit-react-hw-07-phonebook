import { createSlice } from '@reduxjs/toolkit';

const filterInitialState = {
  filterQuery: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    setFilter(state, action) {
      state.filterQuery = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export const selectFilterQuery = state => state.filter.filterQuery;
export const filterReducer = filterSlice.reducer;
