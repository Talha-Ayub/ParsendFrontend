import React from "react";
import "./ParcelDetails.css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Map from "../CreateParcel/components/Map";
import { useLoadScript } from "@react-google-maps/api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { getCurrentLocation } from "../../utils/extras";

const ParcelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parcel, setParcel] = useState({});
  const [pictures, setPictures] = useState(null);
  // const libraries = ["places"];
  const [directions, setDirections] = useState(null);
  const mapRef = useRef();
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [curLoc, setCurLoc] = useState();

  const { isLoaded } = useLoadScript({
    // googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    // googleMapsApiKey: process.env.GOOGLE_API_KEY,
    googleMapsApiKey: "AIzaSyA7bdYkIz07pLrqZ2FdJX01sOYvibTT2nY",
    // libraries,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:3500/parcels/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrigin(response.data.parcel.pickupLocation);
        setDestination(response.data.parcel.destination);
        console.log(response.data);
        setParcel(response.data.parcel);
        setPictures(response.data.pictures);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (origin && destination) {
      const google = window.google;
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
          }
        }
      );
    }
  }, [origin, destination]);

  const handleSubmit = async () => {
    const user = localStorage.getItem("userId");
    // const { lng, lat } = await getCurrentLocation();

    const getCurrentLocation = () => {
      return new Promise((resolve, reject) => {
        // Simulating an asynchronous API request with a timeout
        navigator.geolocation.getCurrentPosition((position) => {
          const { coords } = position;
          // setCurLoc({
          //   lat: coords.latitude,
          //   lng: coords.longitude,
          // });
          resolve({
            lat: coords.latitude,
            lng: coords.longitude,
          });
          // console.log(coords);
        });
      });
    };
    let locs = {};
    await getCurrentLocation().then((data) => {
      locs = data;
    });

    // console.log("Loc: " + curLoc);
    // const formData = ;

    await axios
      .post(`http://localhost:3500/users/${user}/order`, {
        parcel: parcel._id,
        lng: locs.lng,
        lat: locs.lat,
      })
      .then((response) => {
        localStorage.setItem("isRider", true);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!isLoaded) {
    return <div className="fc">Loading Google Maps...</div>;
  }

  return (
    <>
      <Header />
      <div className="parcel-detail-container">
        <h1>Parcel Details</h1>
        <div className="pictures">
          {pictures &&
            pictures.map((picture, key) => (
              <div className="inf-pic-container" key={key}>
                <img
                  className="inf-pic"
                  src={`http://localhost:3500/${picture.path}`}
                  alt={picture._id}
                />
              </div>
            ))}
        </div>
        {directions ? (
          <Map
            directions={directions}
            origin={origin}
            destination={destination}
            mapRef={mapRef}
            Style={"map-dContainer"}
          />
        ) : (
          <div>Loading directions...</div>
        )}

        <div className="details-container">
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                {/* title */}
                <TableRow>
                  <TableCell className="rowtitle">Title</TableCell>
                  <TableCell> {parcel.title}</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {/* description */}
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="rowtitle" component="th" scope="row">
                    description
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {parcel.description}
                  </TableCell>
                </TableRow>

                {/* est Dimension */}
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="rowtitle" component="th" scope="row">
                    Estimated Dimension
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <label>
                      <strong>height</strong>{" "}
                    </label>
                    {parcel?.estDimension?.height}
                    <br />
                    <label>
                      <strong>Width</strong>{" "}
                    </label>
                    {parcel?.estDimension?.width}
                    <br />
                    <label>
                      <strong>Weight</strong>{" "}
                    </label>
                    {parcel?.estDimension?.weight}
                  </TableCell>
                </TableRow>
                {/* value */}
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="rowtitle" component="th" scope="row">
                    value
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {parcel?.value}
                  </TableCell>
                </TableRow>
                {/* commission */}
                <TableRow
                  key={parcel?.title}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="rowtitle" component="th" scope="row">
                    commission
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {parcel?.commission}
                  </TableCell>
                </TableRow>

                {/* time */}
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="rowtitle" component="th" scope="row">
                    Estimated Time
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {parcel?.estTime}
                  </TableCell>
                </TableRow>
                {/* receiver phne num */}
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="rowtitle" component="th" scope="row">
                    Receiver Phone Number
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {parcel?.receiverPhoneNO}
                  </TableCell>
                </TableRow>

                {/* sender phne num */}
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="rowtitle" component="th" scope="row">
                    Sender Phone Number
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {parcel?.senderPhoneNO}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <button onClick={handleSubmit}>Confirm Order</button>
      </div>
      <Footer />
    </>
  );
};

export default ParcelDetails;
