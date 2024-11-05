"use client";

import Sidebar from "@/components/Sidebar/Sidebar";
import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";
import styles from "./app.module.css";
import getCurrentUser from "@/actions/getCurrentUser";
import axios from "axios";
import { getCreateRandomCity } from "@/actions/getCreateRandomCity";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  // const Map = useMemo(
  //   () =>
  //     dynamic(() => import("@/components/Map/Map"), {
  //       loading: () => <p>A map is loading</p>,
  //       ssr: false,
  //     }),
  //   []
  // );
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await axios.post("http://localhost:3000/api/city", {
          data: {
            cityName: "San Francisco",
            country: "USA",
            emoji: "🌉",
            date: "2024-11-01T12:00:00.000Z",
            notes:
              "Famous for the Golden Gate Bridge, cable cars, and Alcatraz Island.",
            lat: 37.7749,
            lng: -122.4194,
          },
        });
      } catch (error) {
        console.error("Error posting city data:", error);
      }
    };

    fetchUser();
  }, []);
  return (
    <main className={styles.app}>
      <Sidebar>{children}</Sidebar>
      {/* <Map /> */}
    </main>
  );
};

export default AppLayout;
