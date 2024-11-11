"use client";

import { signOut } from "next-auth/react";
import styles from "./User.module.css";
import { type User } from "@prisma/client";

async function User({ user }: { user: User }) {
  return (
    <div className={styles.user}>
      {/* <img src={user.avatar} alt={session?.name} /> */}
      <img className="h-4 w-4 bg-gray-100" />
      <span>Welcome, {user?.email}</span>
      <button onClick={() => signOut()} className="hover:opacity-80">Logout</button>
    </div>
  );
}

export default User;
