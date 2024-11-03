"use client";

import styles from "./AuthForm.module.css";
import Button from "@/components/Button/Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@/libs/utils";
import { signIn } from "@/auth";

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const credentialsAuth: SubmitHandler<FieldValues> = (data) => {
    signIn("credentials", data).then((data) => console.log("success"));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(credentialsAuth)}>
      <div className={styles.row}>
        <label htmlFor="email" className="text-lg">
          Email address
        </label>
        <input
          type="email"
          id="email"
          className={cn(`text-xl`, errors["email"] && "border-rose-600")}
          {...register("email", {
            required: true,
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "Invalid email format",
            },
          })}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="password" className="text-lg">
          Password
        </label>
        <input
          type="password"
          id="password"
          className={cn(`text-xl`, errors["password"] && "border-rose-600")}
          {...register("password", { required: true })}
        />
      </div>

      <div>
        <Button type="primary" fullWidth={true}>
          Login
        </Button>
      </div>
    </form>
  );
}
