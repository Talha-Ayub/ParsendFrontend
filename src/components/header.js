import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "./header.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

function Header() {
  const [curLoc, setCurLoc] = useState({});
  const isRider = localStorage.getItem("isRider") == "true";

  if (isRider) {
    const updateTrack = async () => {
      const getCurrentLocation = () => {
        return new Promise((resolve, reject) => {
          // Simulating an asynchronous API request with a timeout
          navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;

            resolve(coords);
            // console.log(coords);
          });
        });
      };

      console.log(curLoc);

      await getCurrentLocation().then((data) => {
        console.log(data);
        setCurLoc({
          lat: data.latitude,
          lng: data.longitude,
        });
      });

      // const formData = ;
      try {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("userId");

        await axios
          .patch(
            `http://localhost:3500/users/${user}/order`,
            {
              lng: curLoc.lng,
              lat: curLoc.lat,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {})
          .catch((error) => {
            console.error(error);
          });
      } catch {}

      // localStorage.setItem("isRider", true);
    };

    setInterval(updateTrack, 60 * 1000);
  }

  return (
    <>
      <header>
        <div className="left">
          <Link to="/parcels/create">Post</Link>
          <Link to="/parcels">Browse</Link>
          <Link to="/order">Order</Link>
        </div>
        <div className="logo">
          <Link to="/" className="Dummy b1">
            <img src={logo} width={"50px"} />{" "}
          </Link>
        </div>
        <div className="right">
          <Link to="/">History</Link>
          <Link to="/chatbox">Contact</Link>
          <Link to="/account">Account</Link>
        </div>
      </header>
    </>
  );
}
export default Header;
