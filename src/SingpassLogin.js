import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { getSingpassLoginUrl } from "./backend";

export default function SingpassLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    const spToken = localStorage.getItem("singpassToken");
    if (spToken) {
      navigate("/postLogin");
    }
  });

  async function singpassLoginType1() {
    console.log("login with singpass");
    const id = uuidv4();
    const callbackUrlPath = "/token";
    const spUrl = await getSingpassLoginUrl(callbackUrlPath, id);
    console.log(spUrl.data);
    localStorage.setItem("spSessionId", id);
    window.location.href = spUrl.data;
  }

  async function singpassLoginType2() {
    console.log("login with singpass");
    const id = uuidv4();
    const callbackUrlPath = "/tokenAuth";
    const spUrl = await getSingpassLoginUrl(callbackUrlPath, id);
    localStorage.setItem("spSessionId", id);
    const popUpWindow = window.open(
      spUrl.data,
      "Singpass Login",
      "width=500,height=500"
    );
    let count = 0;
    const authInterval = setInterval(() => {
      count++;
      if (popUpWindow.closed) {
        localStorage.removeItem("spSessionId");
        clearInterval(authInterval);
      }
      const token = localStorage.getItem("singpassToken");
      if (token) {
        localStorage.removeItem("spSessionId");
        clearInterval(authInterval);
        if (!popUpWindow.closed) {
          popUpWindow.close();
        }
        navigate("/postLogin");
      }
      if (!token && count >= 35) {
        count = 0;
        localStorage.removeItem("spSessionId");
        clearInterval(authInterval);
      }
    }, 2000);
  }

  async function debug() {
    console.log(process.env);
  }

  return (
    <>
      <h1>Singpass Login</h1>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <h2>User Experience 1</h2>
          <button onClick={() => singpassLoginType1()}>
            login with singpass
          </button>
        </div>
        <div style={{ width: "50%" }}>
          <h2>User Experience 2</h2>
          <button onClick={() => singpassLoginType2()}>
            login with singpass
          </button>
        </div>
      </div>
    </>
  );
}
