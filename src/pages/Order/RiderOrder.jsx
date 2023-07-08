import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RiderOrder = (props) => {
  const navigate = useNavigate();
  const order = props.order;
  const [task, setTask] = useState();

  function handleClick(event) {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    // const task = event.target.value;

    console.log(task);

    if (task !== "Delivered") {
      axios.patch(
        `http://localhost:3500/users/${userId}/order`,
        {
          orderStatus: task,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else if (task === "Delivered") {
      axios.delete(
        `http://localhost:3500/users/${userId}/order`,
        {
          orderStatus: task,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("isRider", false);
      navigate("/");
    }
  }

  return (
    <div>
      Rider
      <p>
        <span>Order Status:</span>
        <select
          name="status"
          id=""
          onChange={(event) => setTask(event.target.value)}
        >
          <option value="Started">Start order</option>
          <option value="Picked">Picked Up</option>
          <option value="Delivering">On Route</option>
          <option value="Delivered"> Delievered</option>
        </select>
      </p>
      <button onClick={handleClick}>Update Order</button>
    </div>
  );
};

export default RiderOrder;
