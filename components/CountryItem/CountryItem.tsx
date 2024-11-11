"use client";

import styles from "./CountryItem.module.css";
type CountryData = {
  country: string;
  emoji: string;
};
function CountryItem({ country }: { country: CountryData }) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
