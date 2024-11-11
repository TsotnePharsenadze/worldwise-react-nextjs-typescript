"use client";

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "../Button/Button";
import BackButton from "../BackButton";
import "react-datepicker/dist/react-datepicker.css";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import { useUrlPosition } from "@/hooks/useUrlPosition";
import DatePicker from "react-datepicker";
import { useCities } from "@/context//CitiesContext";
import { useRouter } from "next/navigation";

export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");

  const router = useRouter();

  const { createCitty, isLoading } = useCities();

  const [lat, lng] = useUrlPosition();

  useEffect(() => {
    async function fetchData() {
      try {
        setGeocodingError("");
        setIsLoadingGeoCoding(true);
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();

        if (!data.countryCode)
          throw new Error(
            "Neither country nor city has been identified, please click somewhere else 👍"
          );

        setCityName(data.city || data.locality);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err: any) {
        setGeocodingError(err.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }

    fetchData();
  }, [lat, lng]);

  if (isLoadingGeoCoding) return <Spinner />;

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map ❤😍" />;

  if (geocodingError) return <Message message={geocodingError} />;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newCity = {
      cityName,
      country,
      emoji,
      date: date as Date,
      notes,
      lat,
      lng,
    };

    createCitty(newCity);
    router.push("/app/cities/");
  }

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker onChange={(date) => setDate(date)} selected={date} className="p-4 rounded-lg bg-gray-200 text-xl" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
