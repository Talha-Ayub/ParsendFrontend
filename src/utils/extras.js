const getCurrentLocation = async () => {
  const geolocationAPI = navigator.geolocation;
  const coordsObj = { };

  if (!geolocationAPI) {
    return { error: "Geolocation API is not available in your browser!" };
  } else {
    geolocationAPI.getCurrentPosition(
      (position) => {
        const { coords } = position;
        
        // console.log(coords);
        
        coordsObj.lat = coords.latitude;
        coordsObj.lng = coords.longitude;
      },
      (error) => {
        return { error: "Something went wrong getting your position!" };
      }
    );
    console.log(coordsObj)
    return coordsObj;
  }
};



export { getCurrentLocation };
