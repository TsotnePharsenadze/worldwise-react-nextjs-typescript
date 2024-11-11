"use client";

import styles from "./CountryList.module.css";
import Spinner from "../Spinner/Spinner";
import CountryItem from "../CountryItem/CountryItem";
import Message from "../Message/Message";
import { useCities } from "@/context/CitiesContext";

type CountryData = {
  country: string;
  emoji: string;
};

const CountryList = () => {
  const { isLoading, cities } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="Add your first city by clicking one on map" />;

  const citiesNew: CountryData[] = cities.reduce(
    (prev: CountryData[], curr) => {
      if (!prev.some((obj) => obj.country === curr.country)) {
        prev.push({ country: curr.country, emoji: curr.emoji });
      }
      return prev;
    },
    []
  );

  return (
    <ul className={styles.countryList}>
      {citiesNew.map((city) => (
        <CountryItem country={city} key={city.country} />
      ))}
    </ul>
  );
};

export default CountryList;
