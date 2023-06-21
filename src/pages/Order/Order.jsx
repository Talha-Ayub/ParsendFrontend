import React from "react";
import "./Order.css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import UserOrder from "./UserOrder";
import RiderOrder from "./RiderOrder";

const Order = () => {
  const [order, setOrder] = useState(null);
  // const [userData, setUserData] = useState({});
  const [isRider, setIsRider] = useState(localStorage.getItem("isRider"));
  const rider = localStorage.getItem("isRider") === "true"; // Convert string to boolean

  useEffect(() => {
    setIsRider(rider);

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("userId");

        const response = await axios.get(
          `http://localhost:3500/users/${user}/order`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrder(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log(order)

  return (
    <>
      <Header />
      <div className="order-container">
        {order ? (
          isRider ? (
            <RiderOrder order={order} />
          ) : (
            <UserOrder order={order} />
          )
        ) : (
          <div>No order</div>
        )}
      </div>
      <Footer />;
    </>
  );
};

export default Order;
