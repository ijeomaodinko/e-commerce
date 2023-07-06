import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../components/utils/contents';
import { getAuthHeaders } from '../../components/utils/contents';

const headers = getAuthHeaders();


export const fetchProducts = createAsyncThunk(
  'product/fetchProducts', async () => {
    const response = await axios.get(`${API_URL}/products`)
    console.log(response.data)
    return response.data
  }
);

export const fetchCategories = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await axios.get(`${API_URL}/categories`, {
      headers
    });
    return response.data;
  }
);


export const fetchCompanies = createAsyncThunk(
  'product/fetchCompanies',
  async () => {
  const response = await axios.get(`${API_URL}/companies`, {
    headers
  })
  return response.data
}
);

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await axios.post(`${API_URL}/products`, { product: product }, {
      headers
    });
    console.log(response.data, 'response.data');
    window.location.href = '/';
    return response.data;
  }
);

// implement orders
export const addProductToOrder = createAsyncThunk(
  'product/addProductToOrder',
  async ({ productId, orderId }) => {
    const response = await axios.post(`${API_URL}/orders/${orderId}/products`, { productId }, { headers });
    return response.data;
  }
);
//

const initialState = {
  products: [],
  error: null,
  status: 'idle',
  selectedProduct: null,
  categories: [],
  companies: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    }).addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products= action.payload;
    }).addCase(fetchProducts.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }).
    addCase(createProduct.pending, (state) => {
      state.status = "loading";
    }).addCase(createProduct.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products = [...state.products, action.payload];
    }).addCase(createProduct.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }).addCase(fetchCategories.pending, (state) => {
      state.status = "loading";
    }).addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.categories= action.payload;
    }).addCase(fetchCategories.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }).addCase(fetchCompanies.pending, (state) => {
      state.status = "loading";
    }).addCase(fetchCompanies.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.companies= action.payload;
    }).addCase(fetchCompanies.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  }
});

export const { selectProduct } = productSlice.actions;
export const getAllProducts = (state) => state.product.products;
export const getProductStatus = (state) => state.product.status;
export const getProductError = (state) => state.product.error;
export const getProductDetails = (state) => state.product.selectedProduct;


export const getAllCategories = (state) => state.product.categories;
export const getAllCompanies = (state) => state.product.companies;

export default productSlice.reducer;