// redux/contactSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Операция для получения контактов
export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, { dispatch }) => {
  try {
    const response = await fetch('https://6555ecb984b36e3a431ea70e.mockapi.io/contacts');
    const data = await response.json();

    dispatch(setContacts(data));
  } catch (error) {
    console.error('Error fetching contacts:', error);
  }
});

// Операция для добавления контакта
export const addContact = createAsyncThunk('contacts/addContact', async (newContact, { dispatch }) => {
  try {
    const response = await fetch('https://6555ecb984b36e3a431ea70e.mockapi.io/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    });

    const data = await response.json();

    dispatch(setContacts(data));
  } catch (error) {
    console.error('Error adding contact:', error);
  }
});

// Операция для удаления контакта
export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId, { dispatch }) => {
  try {
    await fetch(`https://6555ecb984b36e3a431ea70e.mockapi.io/contacts/${contactId}`, {
      method: 'DELETE',
    });

    dispatch(fetchContacts());
  } catch (error) {
    console.error('Error deleting contact:', error);
  }
});

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    filter: '', // Добавлено начальное значение filter
  },
  reducers: {
    setContacts: (state, action) => {
      state.items = action.payload;
    },
    setLoader: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading =
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setContacts, setLoader, setError, setFilter } = contactSlice.actions;
export default contactSlice.reducer;
