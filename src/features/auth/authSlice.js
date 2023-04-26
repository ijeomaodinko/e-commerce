import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../components/utils/contents';

export const signUpUser = createAsyncThunk(
    'auth/signUpUser',
    async({name, address, email, password}) => {
        const response = await axios.post(`${API_URL}/api/auth/signup`, {
            user: {
                name,
                address,
                email,
                password,
            }});
        console.log(response.data, 'response data')
        return response.data;
    }
)


const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  status: 'idle',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state) => {
      state.status = "loading";
    }).addCase(signUpUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.isAuthenticated= true;
      state.user = action.payload;
    }).addCase(signUpUser.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    })
  }
})

// Action creators are generated for each case reducer function
export const {} = authSlice.actions

export default authSlice.reducer