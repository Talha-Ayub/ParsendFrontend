import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const UserOrder = (props) => {
  const order = props.order;

  const handleClick = () => {
    console.log("clikced");
  };

  return (
    <div>
      User
      <p>
        <span>Order Status:</span>
        <span style={{ color: "green" }}>
          {order?.orderStatus &&
            order.orderStatus.charAt(0).toUpperCase() +
              order.orderStatus.slice(1)}
        </span>
      </p>
      <button onClick={handleClick}>
        <Link to="/track">Track Order</Link>
      </button>
    </div>
  );
};

export default UserOrder;
