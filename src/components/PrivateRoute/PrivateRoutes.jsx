import React from 'react';
import { Navigate, useLocation } from 'react-router';
import AuthUser from '../../services/Hook/AuthUser';
import LoadingAnimation from '../../pages/loadingPage/LoadingAnimation';

const PrivateRoutes = ({children}) => {
    const {user,loading} = AuthUser();
    const location = useLocation();
    
    if(loading){
        return <LoadingAnimation></LoadingAnimation>;
    }
    if(user && user?.email){
        return children;
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>;

};

export default PrivateRoutes;