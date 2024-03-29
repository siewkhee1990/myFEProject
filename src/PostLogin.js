import React, { useEffect, useState } from "react";
import { decryptToken } from "./backend";

export default function PostLogin() {
  const [token, setToken] = useState(null);
  const [sid, setSid] = useState("");
  useEffect(() => {
    const accessToken = localStorage.getItem("singpassToken");
    if (accessToken) {
      setToken(JSON.parse(token)); // set token
    }
  }, []);
  useEffect(() => {
    if (token) {
      processToken(token);
    }
  }, [token]);

  async function processToken() {
    const { sid, uuid } = await decryptToken(token);
    setSid(sid);
  }
  return (
    <div>
      <h3>Welcome, {sid}</h3>
    </div>
  );
}
