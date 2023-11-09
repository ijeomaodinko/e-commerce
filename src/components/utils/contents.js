import { toast } from "react-toastify";
import Logo from "../../assets/logo.png";

export const LOGO = Logo;
export const COMPANY_NAME = "EasyBazaar";
export const API_URL = "https://ruby-broker-app.onrender.com";


export const useAuth = () => {
    const token = sessionStorage.getItem('token');
    return token ? true : false;
};

export const useAdmin = () => {
    const user = sessionStorage.getItem('user');
    if (user) {
        const parsedUser = JSON.parse(user);
        return parsedUser.role === 'admin';
    }
    return false;
};

export const useSeller = () => {
    const user = sessionStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.role === 'seller';
    }
    return false;
  };

export const handleToast = ({ msg, type = 'success' }) =>
    toast(msg, {
        position: "top-center",
        autoClose: 9000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
        type,
    });

export const getAuthHeaders = () => {
    const token = sessionStorage.getItem('token');
    return {
        Authorization: token,
    };
};


export const isloggedIn = useAuth();


export const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return randomColor;
};