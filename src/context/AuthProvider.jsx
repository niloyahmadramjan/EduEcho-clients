import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);


  const handleUserCreate = (email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password )
  }
  const handleUserUpdate = (userName,userImage)=>{
    return updateProfile(auth.currentUser,{
      displayName: userName,
      photoURL : userImage
    })
  }

  const handleUserSignIn = (email,password)=>{
    return signInWithEmailAndPassword(auth,email,password);
  }


  const userInfo = {
    handleUserCreate,
    handleUserUpdate,
    handleUserSignIn,
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
