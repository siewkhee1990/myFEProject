import React, { useEffect, useState } from "react";
import { decryptToken } from "./backend";

export default function PostLogin() {
  const [token, setToken] = useState(null);
  const [sid, setSid] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("singpassToken");
    if (accessToken) {
      const tokenObj = JSON.parse(accessToken);
      setToken(tokenObj); // set token
    }
  }, []);

  useEffect(() => {
    if (token) {
      processToken(token).then((sid) => {
        setSid(sid);
      });
    }
  }, [token]);

  async function processToken() {
    const { data: { sid, uuid } = {} } = await decryptToken(token);
    return sid;
  }
  return (
    <div>
      <h3>Welcome, {sid}</h3>
    </div>
  );
}
