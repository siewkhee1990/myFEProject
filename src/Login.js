import React, { useState, useEffect } from "react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";
import Profile from "./Profile";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser, setUserProfile } from "./userReduser.js";
import { useNavigate } from "react-router-dom";
import { getSession } from "./backend";
import { getUserProfile } from "./GoogleLogin";

export default function Login() {
  const user = useSelector((state) => state.user.accessToken);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const existingToken = localStorage.getItem("acsTkn");
      console.log(123, existingToken);
      dispatch(setUser(JSON.parse(existingToken)));
    }
  }, []);

  useEffect(() => {
    console.log(456);
    if (user) {
      console.log(789);
      localStorage.setItem("acsTkn", JSON.stringify(user));
      getUserProfile(user)
        .then((result) => {
          dispatch(setUserProfile(result.data));
        })
        .catch((err) => {
          console.log(10101, err);
          if (err.response?.status === 401) {
            localStorage.removeItem("acsTkn");
          }
        });
    }
  }, [user]);

  const test = () => {
    console.log(user);
    console.log(profile);
    console.log(localStorage);
    // getSession(user);
    // navigate("/test");
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      dispatch(setUser(codeResponse));
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const logout = () => {
    googleLogout();
    dispatch(clearUser());
    localStorage.removeItem("acsTkn");
  };

  const goToProducts = () => {
    navigate("/product");
  };

  return (
    <>
      Login
      {!user && <button onClick={login}>Login with Google</button>}
      {user && <button onClick={logout}>logout</button>}
      {profile && <Profile />}
      <button onClick={goToProducts}>go to Products</button>
      <br />
      <br />
      <button onClick={test}>debug</button>
    </>
  );
}
