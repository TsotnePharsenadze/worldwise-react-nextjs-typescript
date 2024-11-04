import styles from "./Sidebar.module.css";
import AppNav from "@/components/AppNav/AppNav";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.sidebar}>
      <a href="/">
        <img src="/logo.png" alt="WorldWise logo" className="h-[5.2rem]" />
      </a>

      <AppNav />

      {children}

      <footer className={styles.footer}>
        <p>&copy; Copyright {new Date().getFullYear()} by Worldwise Inc.</p>
      </footer>
    </div>
  );
};

export default Sidebar;
