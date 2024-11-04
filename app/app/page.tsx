"use client";

import { signOut } from "next-auth/react";

const AppPage = () => {
  return (
    <button
      onClick={() => {
        signOut();
      }}
    >
      Sign out
    </button>
  );
};

export default AppPage;
