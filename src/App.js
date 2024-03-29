import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SingpassLogin from "./SingpassLogin";
import ProcessToken from "./ProcessToken";
import TokenAuth from "./TokenAuth";
import PostLogin from "./PostLogin";
import NotFound from "./NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SingpassLogin />} />
        <Route path="/token" element={<ProcessToken />} />
        <Route path="/tokenAuth" element={<TokenAuth />} />
        <Route path="/postLogin" element={<PostLogin />} />
        <Route element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
