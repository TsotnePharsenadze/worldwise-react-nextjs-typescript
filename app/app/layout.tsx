import Sidebar from "@/components/Sidebar/Sidebar";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import styles from "./app.module.css";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <main className={styles.app}>
      <Sidebar>{children}</Sidebar>
      <Map />
    </main>
  );
};

export default AppLayout;
