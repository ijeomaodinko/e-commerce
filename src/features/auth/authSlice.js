import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../components/utils/contents';


export const signUpUser = createAsyncThunk(
    'auth/signUpUser',
    async({name, address, email, password}, {dispatch}) => {
      try {
        const response = await axios.post(`${API_URL}/api/auth/signup`, {
            user: {
                name,
                address,
                email,
                password,
            },
          });
        if (response.status === 201){
          const { data } = response;
        const user = data.data;
        const token = response.headers.authorization;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
        console.log('user', user, 'token', token);

        window.location.href = '/';
        return response.data;
        }
      }catch (error) {
        console.log(error.response.data.status.message, 'error message');
        dispatch(setError(error.response.data.status.message));
      }
    }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { dispatch }) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        user: {
          email,
          password,
        },
      });

      if (response.status === 200) {
        const { data } = response;
        const user = data.data;
        const token = response.headers.authorization;

        // Save the token in the session storage
        sessionStorage.setItem('token', token);

        // Attach the token to subsequent API requests
        axios.defaults.headers.common['Authorization'] = token;

        sessionStorage.setItem('user', JSON.stringify(user));

        window.location.href = '/';
        return response.data;
      }
    } catch (error) {
      console.log(error);
      dispatch(setError(error.response.data));
    }
  }
);

// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async({ email, password }, { dispatch })=> {
//     try{
//       const response = await axios.post(`${API_URL}/api/auth/login`, {
//         user: {
//           email,
//           password,
//         }
//       });
//       if (response.status === 200) {
//         const { data } = response;
//         const user = data.data;
//         const token = response.headers.authorization;
//         sessionStorage.setItem('token', token);
//         sessionStorage.setItem('user', JSON.stringify(user));

//         window.location.href = '/';
//         return response.data;
//       }
//     } catch (error) {
//       console.log(error);
//       dispatch(setError(error.response.data));
//     }
//   }
// );

export const logOutUser = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  window.location.href = '/';
}


const initialState = {
  // user: null,
  isAuthenticated: false,
  user: null,
  error: null,
  status: 'idle',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  setError(state, action) {
    state.error = action.payload;
  }
  },
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
    .addCase(loginUser.pending, (state) => {
      state.status = "loading";
    }).addCase(loginUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.isAuthenticated= true;
      state.user = action.payload;
    }).addCase(loginUser.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setError } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated =(state) => state.auth.isAuthenticated;
export const selectError = (state) => state.auth.error;
export const selectStatus = (state) => state.auth.status;

export default authSlice.reducer