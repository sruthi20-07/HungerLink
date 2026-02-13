import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

interface Props {
  ngos: any[];
}

const GoogleMapView: React.FC<Props> = ({ ngos }) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDy4p7kY_mCZWx76jpAq_176_-VKOR6wPQ">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 17.385, lng: 78.4867 }}
        zoom={12}
      >
        {ngos.map((ngo: any, index: number) => (
          <Marker
            key={index}
            position={{
              lat: ngo.location.coordinates[1],
              lng: ngo.location.coordinates[0],
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapView;
