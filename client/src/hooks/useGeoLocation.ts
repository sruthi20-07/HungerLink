import { useEffect, useState } from "react";

export default function useGeo() {
  const [coords, setCoords] = useState<any>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
  }, []);

  return coords;
}
