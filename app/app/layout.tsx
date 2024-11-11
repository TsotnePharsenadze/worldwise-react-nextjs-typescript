import Sidebar from "@/components/Sidebar/Sidebar";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import styles from "./app.module.css";
import User from "@/components/User/User";
import getCurrentUser from "@/actions/getCurrentUser";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  const user = await getCurrentUser();

  return (
    <main className={styles.app}>
      <Sidebar>{children}</Sidebar>
      <Map />
      {user && <User user={user} />}
    </main>
  );
};

export default AppLayout;
