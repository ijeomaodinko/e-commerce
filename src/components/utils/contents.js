import { toast } from "react-toastify";

export const LOGO ="";
export const COMPANY_NAME = "Company Name";
export const API_URL = "http://127.0.0.1:3000";


export const useAuth = () => {
   const token = sessionStorage.getItem('token');
   return token ? true : false;
};

export const useAdmin = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user && user.role === 'admin' ? true : false;
};

export const handleToast = ({msg, type = 'success'}) =>
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
}
