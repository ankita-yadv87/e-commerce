import React from 'react'
import { Link } from "react-router-dom";
import "./CartItems.css";

const CartItems = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <div>{`Price: ₹${item.price}`}</div>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
  
}

export default CartItems

