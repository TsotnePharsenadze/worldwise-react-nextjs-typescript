"use client";

import styles from "./CityItem.module.css";
import { useCities } from "@/context/CitiesContext";
import Link from "next/link";

type City = {
  id: number;
  cityName: string;
  emoji: string;
  date: Date;
  position: {
    lat: number;
    lng: number;
  };
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

const CityItem = ({ city }: { city: City }) => {
  const { currentCity, deleteCity } = useCities();
  const { id, cityName, emoji, date, position } = city;

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteCity(id);
  };

  return (
    <li>
      <Link
        href={{
          pathname: `/app/cities/${id}`,
          query: { lat: position.lat, lng: position.lng },
        }}
        passHref
        legacyBehavior
      >
        <a
          className={`${styles.cityItem} ${
            id === currentCity?.id ? styles["cityItem--active"] : ""
          }`}
        >
          <span className={styles.emoji}>{emoji}</span>
          <h3 className={styles.name}>{cityName}</h3>
          <time className={styles.date}>{formatDate(date)}</time>
          <button onClick={handleDelete} className={styles.deleteBtn}>
            &times;
          </button>
        </a>
      </Link>
    </li>
  );
};

export default CityItem;
