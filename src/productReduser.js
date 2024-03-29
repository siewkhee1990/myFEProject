import { createSlice } from "@reduxjs/toolkit";
import { getProducts as getProductsBackend } from "./backend";

export const product = createSlice({
  name: "product",
  initialState: {
    products: null,
  },
  reducers: {
    setProducts: (state, { payload }) => {
      state.products = payload;
    },
    getProducts: (state) => {
      getProductsBackend().then((result) => {
        console.log(result);
        state.products = result.data;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProducts, getProducts } = product.actions;

export default product.reducer;
