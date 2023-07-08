import "./LiveTrack.css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import axios from "axios";

function LiveTrack(props) {
  const mapRef = useRef();
  // const center = useMemo(() => ({ lat: 31.5204, lng: 74.3587 }), []);
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const [loc, setLoc] = useState();

  const { isLoaded } = useLoadScript({
    // googleMapsApiKey: process.env.GOOGLE_API_KEY,
    googleMapsApiKey: "AIzaSyA7bdYkIz07pLrqZ2FdJX01sOYvibTT2nY",
    // libraries,
  });

  const options = useMemo(
    () => ({
      mapId: "c61d99011041fd57",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("userId");

        const response = await axios.get(
          `http://localhost:3500/track/${user}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoc(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log(loc);

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <>
      <Header />
      <div className="LiveTracking-container">
        <h5>Live track your parcel</h5>

        <GoogleMap
          zoom={10}
          center={loc}
          mapContainerClassName={"track-map"}
          options={options}
          onLoad={onLoad}
        >
          {origin && (
            <Marker
              position={loc}
              // icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
            />
          )}
        </GoogleMap>
      </div>
      <Footer />
    </>
  );
}
export default LiveTrack;
