import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../components/utils/contents';

export const fetchProduct = createAsyncThunk(
  'product/fetchProducts', async () => {
    const response = await axios.get(`${API_URL}/products`)
    console.log(response.data)
    return response.data
  }
)
const initialState = {
  products: [],
  error: null,
  status: 'idle'
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
});

export const {} = productSlice.actions

export default productSlice.reducer