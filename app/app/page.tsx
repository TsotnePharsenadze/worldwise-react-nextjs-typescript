"use client";
import { signOut } from "next-auth/react";

const AppPage = async () => {
  return <button onClick={() => signOut()}>Sign out</button>;
};

export default AppPage;
