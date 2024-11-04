"use client";

import { usePathname } from "next/navigation";
import styles from "./AppNav.module.css";

function AppNav() {
  const pathname = usePathname();
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <a href={`${pathname}/cities`}>Cities</a>
        </li>
        <li>
          <a href={`${pathname}/countries`}>Countries</a>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
