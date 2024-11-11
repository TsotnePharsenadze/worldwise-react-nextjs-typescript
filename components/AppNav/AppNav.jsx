"use client";

import { usePathname } from "next/navigation";
import styles from "./AppNav.module.css";

function AppNav() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <a
            href={`/app/cities`}
            className={`${pathname.includes("cities") && "active"}`}
          >
            Cities
          </a>
        </li>
        <li>
          <a
            href={`/app/countries`}
            className={`${pathname.includes("countries") && "active"}`}
          >
            Countries
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
