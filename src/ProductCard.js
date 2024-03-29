import React, { useState } from "react";
import { buyItem as buyItemBackend } from "./backend";

export default function ProductCard({ product }) {
  function buyItem(id) {
    // console.log(id, product);
    buyItemBackend(id).then((result) => {
    //   console.log(result.data);
      window.open(result.data.url, "_blank", "width=500,height=500");
    });
  }
  return (
    <div className="card" style={{ width: 18 + "rem" }}>
      <img src={product.imgLink} alt="default" className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">Price: {product.price}</p>
        <button onClick={() => buyItem(product.id)}>buy</button>
      </div>
    </div>
  );
}
