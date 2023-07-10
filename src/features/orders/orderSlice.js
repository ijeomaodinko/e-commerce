import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../components/utils/contents';
import { getAuthHeaders } from '../../components/utils/contents';
import { setError } from '../auth/authSlice';

const headers = getAuthHeaders();

export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
  const response = await axios.get(`${API_URL}/orders`, { headers });
  return response.data;
});


export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (order, { dispatch, getState }) => {
    try {
      const state = getState();
      const user = state.auth.user;
      const token = state.auth.token;

      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      };

      const orderData = {
        ...order,
        user_id: user?.id, // Add the user_id to the order data
      };

      const response = await axios.post(`${API_URL}/orders`, { order: orderData }, config);
      console.log(response.data, 'response.data');
      window.location.href = '/order';
      return response.data;
    } catch (error) {
      console.log(error);
      dispatch(setError(error.response.data));
      throw error;
    }
  }
);


const initialState = {
  orders: [],
  error: null,
  status: 'idle',
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
        console.log(action.error);
      });
  },
});

export const { selectOrder } = orderSlice.actions;
export const getAllOrders = (state) => state.order.orders;
export const getOrderStatus = (state) => state.order.status;
export const getOrderError = (state) => state.order.error;

export default orderSlice.reducer;
