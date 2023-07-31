import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../components/utils/contents';
import { getAuthHeaders } from '../../components/utils/contents';

const headers = getAuthHeaders();

export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
  const response = await axios.get(`${API_URL}/orders`, { headers });
  console.log(headers);
  console.log(response.data);
  return response.data;
});

const authToken = sessionStorage.getItem('authToken');


// export const createOrder = createAsyncThunk('order/createOrder', async (order) => {
//   try {
//     const response = await axios.post(`${API_URL}/orders`, {order: order}, {
//       headers: {
//       },
//     });
//     console.log('response order', response.data );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// });


export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await axios.post(`${API_URL}/orders`, { order: order }, {
      headers
    });
    console.log(response.data, 'response.data');
    window.location.href = '/orders';
    return response.data;
  }
);


export const cancelOrder = createAsyncThunk(
  'order/cancelOrder',
  async (orderId) => {
    try {
      const response = await axios.delete(`${API_URL}/orders/${orderId}`, {
        headers, 
      });
      console.log(response.data, 'response.data');
      return { orderId };
    } catch (error) {
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
      })
      .addCase(cancelOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const canceledOrderId = action.payload.orderId;
        const canceledOrder = state.orders.find((order) => order.id === canceledOrderId);
        if (canceledOrder) {
          canceledOrder.status = 'canceled';
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export const { selectOrder } = orderSlice.actions;
export const getAllOrders = (state) => state.order.orders;
export const getOrderStatus = (state) => state.order.status;
export const getOrderError = (state) => state.order.error;

export default orderSlice.reducer;
