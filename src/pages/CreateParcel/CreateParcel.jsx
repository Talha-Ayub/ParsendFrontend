import "./CreateParcel.css";
import InputField from "../../components/InputField";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useNavigate } from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";
import { useState, useRef } from "react";
import axios from "axios";

import Places from "./components/Places";
import Map from "./components/Map";

const CreateParcel = (props) => {
  const google = window.google;
  const libraries = ["places"];
  // const [isRider, setIsRider] = useState(null);
  const isRider = localStorage.getItem("isRider") === "true"; // Convert string to boolean

  const { isLoaded } = useLoadScript({
    // googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    // googleMapsApiKey: process.env.GOOGLE_API_KEY,
    googleMapsApiKey: "AIzaSyA7bdYkIz07pLrqZ2FdJX01sOYvibTT2nY",
    libraries,
  });

  const mapRef = useRef();
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [directions, setDirections] = useState();

  const [formsData, setFormsData] = useState({
    title: "",
    description: "",
    value: "",
    oLat: "",
    oLng: "",
    dLat: "",
    dLng: "",
    senderPhoneNO: "",
    receiverPhoneNO: "",
    currentAddress: "",
    destinationAddress: "",
    width: "",
    height: "",
    weight: "",
    commission: "",
    estTime: "",
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

      // setFormsData((prevFormsData) => ({
      //   ...prevFormsData,
      //   estTime: directions?.routes[0]?.legs[0]?.duration.text,
      //   commission:
      //     (directions?.routes[0]?.legs[0]?.distance.value / 1000) * 50,
      // }));

      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("pictures", selectedFiles[i]);
      }

      console.log(formsData.estDimension);
      formData.append("title", formsData.title);
      formData.append("description", formsData.description);
      formData.append("value", formsData.value);
      formData.append("senderPhoneNO", formsData.senderPhoneNO);
      formData.append("receiverPhoneNO", formsData.receiverPhoneNO);
      formData.append("currentAddress", formsData.currentAddress);
      formData.append("destinationAddress", formsData.destinationAddress);
      formData.append("height", formsData.height);
      formData.append("width", formsData.width);
      formData.append("weight", formsData.weight);
      formData.append("oLat", origin.lat);
      formData.append("oLng", origin.lng);
      formData.append("dLat", destination.lat);
      formData.append("dLng", destination.lng);
      if (!formsData.commission) return;
      formData.append("commission", formsData.commission);
      if (!formsData.estTime) return;
      formData.append("estTime", formsData.estTime);

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

  const fetchDirections = () => {
    if (!origin) return;
    if (!destination) return;

    const service = new google.maps.DirectionsService();

    service.route(
      {
        origin,
        destination,
        travelMode: "DRIVING",
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
          setFormsData((prevFormsData) => ({
            ...prevFormsData,
            estTime: result?.routes[0]?.legs[0]?.duration.text,
            commission:
              (result?.routes[0]?.legs[0]?.distance.value / 1000) * 50,
          }));
        }
      }
    );
  };

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <div className="out">
      <Header />
      {isRider ? (
        <div>Complete the order to post a parcel request</div>
      ) : (
        <div className="sendParcel-container">
          {/* <hr /> */}
          <h2>Send Parcel</h2>
          <div className="sendParcel">
            <form className="sendParcel-in">
              <Places
              ph="Enter pickup"
                setLocation={(position) => {
                  setOrigin(position);
                  mapRef.current?.panTo(position);
                }}
              />
              <Places
              ph="Enter destination"
                setLocation={(position) => {
                  setDestination(position);
                  mapRef.current?.panTo(position);
                }}
              />
              {/* <p
              style={{
                border: "1px solid",
                padding: "5px 50px",
                cursor: "pointer",
              }}
              
            >
              Get route
            </p> */}
              {/* <InputField
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
            /> */}
              <InputField
                ph="Enter title"
                name="title"
                value={formsData.title}
                onChange={handleChange}
                onClick={() => {
                  fetchDirections(origin, destination);

                  console.log(origin);
                }}
              />

              <InputField
                ph="House # 12, Johar Town, Lahore"
                name="currentAddress"
                value={formsData.currentAddress}
                onChange={handleChange}
              />

              <InputField
                ph="House # 87, Bahira Town, Islamabad"
                name="destinationAddress"
                value={formsData.destinationAddress}
                onChange={handleChange}
                size=""
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
            <Map
              directions={directions}
              origin={origin}
              destination={destination}
              mapRef={mapRef}
              Style={"map-container"}
            />
          </div>
        </div>
      )}
      <hr />
      <Footer />
    </div>
  );
};
export default CreateParcel;
