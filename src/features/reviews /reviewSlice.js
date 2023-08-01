// reviewSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../components/utils/contents';
import { getAuthHeaders } from '../../components/utils/contents';

const headers = getAuthHeaders();


export const fetchReviewsForProduct = createAsyncThunk(
  'reviews/fetchReviewsForProduct',
  async (productId) => {
    const response = await axios.get(`${API_URL}/products/${productId}/reviews`, {
      headers,
    });
    return response.data;
  }
);


export const createReviewForProduct = createAsyncThunk(
  'reviews/createReviewForProduct',
  async ({ productId, review }) => {
    const response = await axios.post(`${API_URL}/products/${productId}/reviews`, { review: review }, {
      headers,
    });
    return response.data;
  }
);


export const getUserRatingSummary = (state, productId) => {
  const productReviews = state.review.reviews.filter(
    (review) => review.product_id === productId
  );

  if (productReviews.length === 0) {
    return 0;
  }

  const sumRating = productReviews.reduce((total, review) => total + review.rating, 0);
  return sumRating / productReviews.length;
};




const initialState = {
  reviews: [],
  error: null,
  status: 'idle',
};

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsForProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviewsForProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsForProduct.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(createReviewForProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createReviewForProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews.push(action.payload);
      })
      .addCase(createReviewForProduct.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export const getAllReviews = (state) => state.review.reviews;
export const getReviewStatus = (state) => state.review.status;
export const getReviewError = (state) => state.review.error;

export default reviewSlice.reducer;
