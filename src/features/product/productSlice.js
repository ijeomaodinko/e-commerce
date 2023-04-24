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
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    }).addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products= action.payload;
    }).addCase(fetchProducts.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    })
  }
});

export const {} = productSlice.actions;
export const getAllProducts = (state) => state.product.products;
export const getProductStatus = (state) => state.product.status;
export const getProductError = (state) => state.product.error;

export default productSlice.reducer;