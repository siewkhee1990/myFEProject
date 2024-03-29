import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { setUser, clearUser, setUserProfile } from "./userReduser.js";
import { getUserProfile } from "./GoogleLogin";

export default function RouteProtector() {
  const user = useSelector((state) => state.user);
  const [checking, setChecking] = useState(true);
  let location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const existingToken = JSON.parse(localStorage.getItem("acsTkn"));
    if (existingToken) {
      dispatch(setUser(existingToken));
      getUserProfile(existingToken)
        .then((result) => {
          dispatch(setUserProfile(result.data));
        })
        .catch((err) => {
          if (err.response?.status === 401) {
            localStorage.removeItem("acsTkn");
            dispatch(clearUser());
          }
        })
        .finally(() => {
          setChecking(false);
        });
    } else {
      setChecking(false);
    }
  }, []);

  if (checking) {
    return null;
  }
  if (!checking) {
    if (!user?.profile) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
    return <Outlet />;
  }
}
