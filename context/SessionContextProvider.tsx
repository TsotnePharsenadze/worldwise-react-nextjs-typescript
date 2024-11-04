"use client";

import { SessionProvider } from "next-auth/react";

const SessionContextProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>
};

export default SessionContextProvider;
