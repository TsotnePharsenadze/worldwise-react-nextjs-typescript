import { FaSpinner } from "react-icons/fa";
import styles from "./Button.module.css";

interface ButtonInterface {
  children: React.ReactNode;
  onClick?: (e: any) => void;
  type: string;
  fullWidth?: boolean;
  isLoading: boolean;
}

const Button = ({
  children,
  onClick,
  type,
  fullWidth,
  isLoading,
}: ButtonInterface) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${styles[type]} ${fullWidth ? "w-full" : ""} ${
        isLoading ? "opacity-80 cursor-none" : ""
      }`}
    >
      {isLoading && (
        <span className="animate-spin">
          <FaSpinner />
        </span>
      )}{" "}
      {children}
    </button>
  );
};

export default Button;
