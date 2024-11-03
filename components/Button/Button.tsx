import styles from "./Button.module.css";

interface ButtonInterface {
  children: React.ReactNode;
  onClick?: (e: any) => void;
  type: string;
  fullWidth?: boolean;
}

const Button = ({ children, onClick, type, fullWidth }: ButtonInterface) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${styles[type]} ${fullWidth ? "w-full" : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
