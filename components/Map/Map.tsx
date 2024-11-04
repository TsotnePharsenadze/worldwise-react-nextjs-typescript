// import { useNavigate, useSearchParams } from "next/navigation";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMap,
//   useMapEvent,
// } from "react-leaflet";
// import { useState, useEffect } from "react";
// import { useCities } from "../../contexts/CitiesContext";
// import Button from "../Button/Button";
// import { useGeolocation } from "@/hooks/useGeolocation";
// import { useUrlPosition } from "@/hooks/useUrlPosition";

// const Map = () => {
//   const [position, setPosition] = useState([50, 40]);

//   const {
//     isLoading: isLoadingPosition,
//     position: geolocationPosition,
//     getPosition,
//   } = useGeolocation();

//   const [lat, lng] = useUrlPosition();

//   const { cities } = useCities();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isNaN(lat) && !isNaN(lng)) {
//       setPosition([lat, lng]);
//     }
//   }, [lat, lng]);

//   useEffect(() => {
//     if (geolocationPosition) {
//       setPosition([geolocationPosition.lat, geolocationPosition.lng]);
//     }
//   }, [geolocationPosition]);

//   return (
//     <div className={styles.mapContainer}>
//       <Button type="position" onClick={getPosition}>
//         {isLoadingPosition ? "Loading..." : "use your location"}
//       </Button>
//       <MapContainer
//         center={position}
//         zoom={6}
//         scrollWheelZoom={true}
//         className={styles.map}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
//         />
//         {cities.map((city) => {
//           return (
//             <Marker
//               position={[city.position.lat, city.position.lng]}
//               key={city.id}
//             >
//               <Popup>
//                 <span>{city.emoji}</span>
//                 {city.cityName}
//               </Popup>
//             </Marker>
//           );
//         })}

//         <ChangeCenter position={position} />
//         <DetectClick />
//       </MapContainer>
//     </div>
//   );
// };

// function ChangeCenter({ position }) {
//   const map = useMap();
//   map.setView(position);
//   return null;
// }

// function DetectClick() {
//   const navigate = useNavigate();

//   useMapEvent({
//     click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
//   });
// }

// export default Map;
import styles from "./Map.module.css";

import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function Map(props: any) {
  const { position, zoom } = props;

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
