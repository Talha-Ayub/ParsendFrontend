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
  const [formData, setFormData] = useState({
    dest: "",
    org: "",
  });

  const [search, setSearch] = useState(false);

  const handleChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    const rider = localStorage.getItem("isRider") === "true"; // Convert string to boolean
    setIsRider(rider);

    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        // Make API call here
        const response = await axios.post(
          `http://localhost:3500/parcels`,
          {
            id: userId,
            dest: formData.dest,
            org: formData.org,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setParcels(response.data);
        // Process the response or update component state
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the function to make the API call
  }, [search]); // Empty dependency array to trigger the effect only once on mount

  const viewDetails = (id) => {
    navigate(`/parcels/${id}`);
  };

  const handleClick = () => {
    setSearch(search !== true);
  };

  return (
    <>
      <Header />
      {isRider ? (
        <div>Complete the order to view a parcel request</div>
      ) : (
        <div>
          <div className="fc">
            <h2>Available Parcels</h2>
            <div>
              <input type="button" value="Filter" onClick={handleClick} />
              <input
                type="text"
                placeholder="Destination"
                name="dest"
                value={formData.dest}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Origin"
                name="org"
                value={formData.org}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="tb">
            <table className="t1">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Value</th>
                  <th>Commission</th>
                  <th>Detaild</th>
                </tr>
              </thead>
              {parcels ? (
                parcels.map((parcel) => (
                  <tr key={parcel._id}>
                    <td>{parcel.title}</td>
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
                ))
              ) : (
                <h2>No parcels found</h2>
              )}
            </table>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
