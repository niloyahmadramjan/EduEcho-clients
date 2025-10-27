import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import AuthUser from '../services/Hook/AuthUser'; // your Firebase hook
import { getAuth } from 'firebase/auth';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // ✅ from .env
});

const useAxiosSecure = () => {
  const { handleUserSignOut, user } = AuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Request Interceptor: attach Firebase ID token to headers
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        try {
          const auth = getAuth();
          const currentUser = auth.currentUser;

          if (currentUser) {
            const firebaseToken = await currentUser.getIdToken(/* forceRefresh */ true);
            config.headers.Authorization = `Bearer ${firebaseToken}`;
          }
        } catch (err) {
          console.error('Error getting Firebase token:', err);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ✅ Response Interceptor: handle unauthorized or forbidden errors
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          console.warn('Token expired or unauthorized — signing out...');
          await handleUserSignOut();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    // ✅ Cleanup interceptors when component unmounts
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [handleUserSignOut, navigate, user]);

  return axiosSecure;
};

export default useAxiosSecure;
