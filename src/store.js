import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReduser.js";
import productReducer from "./productReduser";

export default configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});
