import { useState, useEffect } from 'react';
import useAxiosSecure from './useAxiosSecure';
import AuthUser from '../services/Hook/AuthUser';

const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  const { user, loading } = AuthUser();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const checkAdmin = async () => {
      if (user && user.email) {
        try {
          const res = await axiosSecure.get('/admin/check-admin');
          setIsAdmin(res.data.isAdmin);
        } catch (error) {
            console.log(error)
          setIsAdmin(false);
        } finally {
          setAdminLoading(false);
        }
      } else {
        setAdminLoading(false);
      }
    };

    if (!loading) {
      checkAdmin();
    }
  }, [user, loading, axiosSecure]);

  return [isAdmin, adminLoading];
};

export default useAdmin;