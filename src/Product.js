import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "./backend";
import { useNavigate } from "react-router-dom";
import { setProducts } from "./productReduser";
import ProductCard from "./ProductCard";

export default function Product() {
  const productList = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function refreshProduct() {
    await getProducts()
      .then((result) => {
        dispatch(setProducts(result.data.data));
      })
      .catch((err) => {
        console.log(123,err);
      });
  }

  useEffect(() => {
    if (!productList?.length) {
      refreshProduct();
    }
  }, []);

  const goBack = () => {
    navigate("/");
  };

  return (
    <div>
      Product
      <button onClick={() => refreshProduct()}>refresh product</button>
      {productList?.length &&
        productList.map((elem, index) => (
          <ProductCard key={index} product={elem} />
        ))}
      <button onClick={goBack}>go back</button>
    </div>
  );
}
