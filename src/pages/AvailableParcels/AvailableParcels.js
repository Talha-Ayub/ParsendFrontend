import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import "./AvailableParcels.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AvailableParcels() {
  const navigate = useNavigate();
  const [parcels, setParcels] = useState([]);
  const [isRider, setIsRider] = useState(null);

  useEffect(() => {
    const rider = localStorage.getItem("isRider") === "true"; // Convert string to boolean
    setIsRider(rider);

    const fetchData = async () => {
      try {
        // const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        // console.log(userId);

        // Make API call here
        const response = await axios.get(`http://localhost:3500/parcels`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setParcels(response.data);
        // Process the response or update component state
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the function to make the API call
  }, []); // Empty dependency array to trigger the effect only once on mount

  // console.log(parcels);

  const viewDetails = (id) => {
    navigate(`/parcels/${id}`);
  };

  console.log(isRider);

  return (
    <>
      <Header />
      {isRider ? (
        <div>Complete the order to view a parcel request</div>
      ) : (
        <div>
          <hr />
          <h2>Available Parcels</h2>
          <div className="tb">
            <table className="t1">
              <tr>
                <th>Sender</th>
                <th>Value</th>
                <th>Commission</th>
                <th>Detaild</th>
              </tr>
              {parcels.map((parcel) => (
                <tr key={parcel._id}>
                  <td>{parcel.user}</td>
                  <td>{parcel.value}</td>
                  <td>{parcel.commission}</td>
                  <td>
                    <button
                      className="vieww"
                      onClick={() => viewDetails(parcel._id)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
