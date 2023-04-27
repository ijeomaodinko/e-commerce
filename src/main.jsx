import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import store from './app/store';
import { Provider } from 'react-redux';
import Root from './routes/root';
import About from './routes/about';
import ErrorPage from './error-page';
import ProductDetails from './features/product/components/productDetails';
import SignUpForm from './features/auth/forms/signUpForm';
import LoginForm from './features/auth/forms/loginForm';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/About",
    element: <About />,
    errorElement: <ErrorPage />,
  },
  {
    path: "auth/signup",
    element: <SignUpForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "auth/login",
    element: <LoginForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/products/:productId",
    element: <ProductDetails  />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
   <RouterProvider router={router} />
   </Provider>
  </React.StrictMode>,
)
