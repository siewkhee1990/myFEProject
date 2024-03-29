import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "./backend";

export default function TokenAuth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [code, setCode] = useState(null);
  const [state, setState] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const spToken = localStorage.getItem("singpassToken");
    if (spToken) {
      navigate("/postLogin");
    }
  });

  useEffect(() => {
    setCode(searchParams.get("code"));
    setState(searchParams.get("state"));
  });

  useEffect(() => {
    if (code && state) {
      const sessionId = localStorage.getItem("spSessionId");
      if (sessionId !== state) {
        localStorage.removeItem("spSessionId");
        navigate("/");
      } else {
        callTokenEndpoint();
      }
    }
  }, [code, state]);

  async function callTokenEndpoint() {
    const response = await getAccessToken("/tokenAuth", code);
    localStorage.setItem("singpassToken", JSON.stringify(response.data));
    localStorage.removeItem("spSessionId");
  }

  async function debug() {
    console.log(code);
    console.log(state);
    const sessionId = localStorage.getItem("spSessionId");
    console.log(sessionId);
  }
  return (
    <div>
      <Rings
        visible={true}
        height="80"
        width="80"
        color="#CF0B15"
        ariaLabel="rings-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <h3>Authenticating... Please wait a while...</h3>
      <h4>Please do not close this page.</h4>
    </div>
  );
}
