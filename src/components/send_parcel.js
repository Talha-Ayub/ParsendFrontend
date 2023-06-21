import "./send_parcel.css";
import InputField from "./InputField";
import Header from "./header";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";
import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";

import axios from "axios";

function Map() {
  const center = useMemo(() => ({ lat: 31.5204, lng: 74.3587 }), []);

  return (
    <GoogleMap zoom={14} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}

const Send_parcel = (props) => {
  const { isLoaded } = useLoadScript({
    // googleMapsApiKey: process.env.GOOGLE_API_KEY,
    libraries: ["places"],
  });

  const [formsData, setFormsData] = useState({
    title: "",
    description: "",
    value: "",
    pickupLocation: "",
    destination: "",
    senderPhoneNO: "",
    receiverPhoneNO: "",
    width: "",
    height: "",
    weight: "",
  });

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileInputChange = (event) => {
    setSelectedFiles(event.target.files);
  };
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormsData((prevFormsData) => ({
      ...prevFormsData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("pictures", selectedFiles[i]);
      }

      console.log(formsData.estDimension);
      formData.append("title", formsData.title);
      formData.append("description", formsData.description);
      formData.append("value", formsData.value);
      formData.append("pickupLocation", formsData.pickupLocation);
      formData.append("destination", formsData.destination);
      formData.append("senderPhoneNO", formsData.senderPhoneNO);
      formData.append("receiverPhoneNO", formsData.receiverPhoneNO);
      formData.append("height", formsData.height);
      formData.append("width", formsData.width);
      formData.append("weight", formsData.weight);

      axios
        .post(`http://localhost:3500/users/${userId}/parcels`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          navigate("/accepted");
        })
        .catch((error) => {
          console.error(error);
        });
      // Process the response or update component state
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="out">
      <Header />

      <div className="sendParcel-container">
        {/* <hr /> */}
        <h2>Send Parcel</h2>
        <div className="sendParcel">
          <form className="sendParcel-in">
            <InputField
              ph="Enter Pickup location"
              name="pickupLocation"
              value={formsData.pickupLocation}
              onChange={handleChange}
            />

            <InputField
              ph="Enter Destination"
              name="destination"
              value={formsData.destination}
              onChange={handleChange}
              size=""
            />
            <InputField
              ph="Enter title"
              name="title"
              value={formsData.title}
              onChange={handleChange}
            />

            <InputField
              ph="Enter Description"
              name="description"
              value={formsData.description}
              onChange={handleChange}
            />

            <InputField
              ph="Enter value"
              name="value"
              value={formsData.value}
              onChange={handleChange}
              size=""
            />

            <InputField
              ph="  Enter parcel in height(inches)"
              name="height"
              value={formsData.height}
              onChange={handleChange}
              size=""
            />

            <InputField
              ph="Enter Parcel width(inches)"
              name="width"
              value={formsData.width}
              onChange={handleChange}
              size=""
            />

            <InputField
              ph="Enter Parcel Weight(kg)"
              name="weight"
              value={formsData.weight}
              onChange={handleChange}
              size=""
            />

            <InputField
              ph="Sender's Phone No"
              name="senderPhoneNO"
              value={formsData.senderPhoneNO}
              onChange={handleChange}
              size=""
            />

            <InputField
              ph="Receiver's Phone No"
              name="receiverPhoneNO"
              value={formsData.receiverPhoneNO}
              onChange={handleChange}
              size=""
            />

            <input
              type="file"
              name="pictures"
              multiple
              onChange={handleFileInputChange}
            />

            <button type="Submit" onClick={handleSubmit}>
              Confirm
            </button>
          </form>
          <Map className="map-container" />
        </div>
      </div>
      <hr />
      <Footer />
    </div>
  );
};
export default Send_parcel;
