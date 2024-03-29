import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Login from "./Login";
import Product from "./Product";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./store";
import RouteProtector from "./RouteProtector";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PaymentPage from "./PaymentPage";
import SingpassLogin from "./SingpassLogin";
import ProcessToken from "./ProcessToken";
import TokenAuth from "./TokenAuth";
import PostLogin from "./PostLogin";
const clientId =
  "295206134846-ioe3be1o0vikujq0tmvblea23f9qkptv.apps.googleusercontent.com";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SingpassLogin />,
  },
  { path: "/token", element: <ProcessToken /> },
  { path: "/tokenAuth", element: <TokenAuth /> },
  {
    path: "/postLogin",
    element: <PostLogin />,
  },
]);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login />,
//   },
//   {
//     element: <RouteProtector />,
//     children: [
//       {
//         path: "/product",
//         element: <Product />,
//       },
//       { path: "/test", element: <div>Hello world!</div> },
//       { path: "/paymentPage", element: <PaymentPage /> },
//       { path: "/paymentSuccess", element: <div>Payment done!</div> },
//     ],
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
