"use client";

import styles from "./City.module.css";
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
import { useCities } from "@/context/CitiesContext";
import React from "react";
import BackButton from "../BackButton";

type Position = {
  lat: number;
  lng: number;
};

type City = {
  id: number;
  cityName: string;
  emoji: string;
  date: string;
  position: Position;
  notes?: string;
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City({ id }: { id: string }) {
  const { currentCity, getCity, isLoading } = useCities();

  React.useEffect(() => {
    if (id) {
      getCity(Number(id));
    }
  }, [id, getCity]);

  if (isLoading) return <Spinner />;

  if (!currentCity) return <Message message="No data found" />;

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${encodeURIComponent(cityName)}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
