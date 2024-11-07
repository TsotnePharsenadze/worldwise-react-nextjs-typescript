"use client";

import { useRouter } from "next/navigation";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useState, useEffect } from "react";
import { useCities } from "@/context/CitiesContext";
import Button from "../Button/Button";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useUrlPosition } from "@/hooks/useUrlPosition";
import styles from "./Map.module.css";

interface ChangeCenterProps {
  position: [number, number];
}

const Map = () => {
  const [position, setPosition] = useState<[number, number]>([50, 40]);

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation({ defaultPosition: { lat: 50, lng: 40 } });

  const [lat, lng] = useUrlPosition();

  const { cities } = useCities();
  const router = useRouter();
  console.log(cities);
  useEffect(() => {
    if (lat !== null && lng !== null && !isNaN(lat) && !isNaN(lng)) {
      setPosition([lat, lng]);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (geolocationPosition) {
      setPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : "Use your location"}
      </Button>
      <MapContainer
        center={position}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.emoji}</span>
                {city.cityName}
              </Popup>
            </Marker>
          );
        })}

        <ChangeCenter position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

function ChangeCenter({ position }: ChangeCenterProps) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position, map]);
  return null;
}

function DetectClick() {
  const router = useRouter();

  useMapEvent("click", (e) => {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    router.push(`/form?lat=${lat}&lng=${lng}`);
  });

  return null;
}

export default Map;
