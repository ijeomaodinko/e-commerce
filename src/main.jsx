import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import store from './app/store';
import { Provider } from 'react-redux';
import Root from './routes/root';
import About from './routes/about';
import { useAuth } from './components/utils/contents';
import ErrorPage from './error-page';
import ProductDetails from './features/product/components/productDetails';
import SignUpForm from './features/auth/forms/signUpForm';
import LoginForm from './features/auth/forms/loginForm';
import ProductForm from './features/product/components/productForm';
import CartElement from './routes/cart';
import OrderElement from './routes/order';
import OrderForm from './features/orders/components/orderForm';



export const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  if (!auth) return < Navigate to="/auth/login"  />;
  return children;
};

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
    path: "/auth/signup",
    element: <SignUpForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth/login",
    element: <LoginForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/products/:productId",
    element: <ProductDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/products/new",
    element: <ProductForm  />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/Cart",
    element: <CartElement />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/Orders",
    element: <OrderElement />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/OrderForm",
    element: <OrderForm />,
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
