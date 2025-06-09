import React, { use } from 'react';
import { AuthContext } from '../../context/AuthContext';

const AuthUser = () => {
    const userInfo = use(AuthContext)
    return userInfo;
};

export default AuthUser;