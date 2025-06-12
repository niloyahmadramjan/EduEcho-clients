import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading,setLoading]= useState(true)


  const handleUserCreate = (email,password)=>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth,email,password )
  }
  const handleUserUpdate = (userName,userImage)=>{
    return updateProfile(auth.currentUser,{
      displayName: userName,
      photoURL : userImage
    })
  }

  // log in google
    const googelProvider = new GoogleAuthProvider();
    const handleLogInUserWithGoogle = () => {
      setLoading(true);
      return signInWithPopup(auth, googelProvider);
      
    };
    // log in github
    const githubProvider = new GithubAuthProvider();
    const handleLogInUserWithGithub = () => {
      setLoading(true);
      return signInWithPopup(auth, githubProvider);
    };
// sign in use email and password
  const handleUserSignIn = (email,password)=>{
    return signInWithEmailAndPassword(auth,email,password);
  }

  //   sign out 
  const handleUserSignOut = ()=>{
      return signOut(auth)
  }


  const fetchUserData = (uid) => {
  axios.get(`http://localhost:3000/userinfo/${uid}`)
    .then((res) => {
      const user = res.data;
     setUser(user)
    })
    .catch((err) => {
      console.error("Failed to fetch user info", err);
    });
};


  const userInfo = {
    handleUserCreate,
    handleUserUpdate,
    handleUserSignIn,
    handleLogInUserWithGoogle,
    handleLogInUserWithGithub,
    handleUserSignOut,
    fetchUserData,
    user,
    setUser,
    setLoading,
    loading
  };

  
      useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      return () => unsubscribe();
    }, []);

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
