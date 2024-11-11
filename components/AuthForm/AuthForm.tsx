"use client";

import styles from "./AuthForm.module.css";
import Button from "@/components/Button/Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@/libs/utils";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [variant, setVariant] = useState("LOGIN");
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/app");
    }
  }, [session?.status, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const credentialsAuth: SubmitHandler<FieldValues> = async (data) => {
    if (variant === "REGISTER") {
      setIsLoading(true);
      await axios
        .post("/api/register", { data })
        .finally(() => setIsLoading(false));
    } else {
      await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      }).finally(() => setIsLoading(false));
    }
  };

  const toggleVariant = () => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(credentialsAuth)}>
      {variant === "REGISTER" && (
        <div className={styles.row}>
          <label htmlFor="name" className="text-lg">
            Name
          </label>
          <input
            type="text"
            id="name"
            className={cn(`text-xl`, errors["name"] && "border-rose-600")}
            {...register("name", {
              required: true,
            })}
          />
        </div>
      )}

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
        <Button type="primary" isLoading={isLoading} fullWidth={true}>
          {variant === "LOGIN" ? "Login" : "Register"}
        </Button>
      </div>

      <hr />
      <div className="text-center text-lg">
        <span>
          {variant === "LOGIN"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span
            className="hover:underline cursor-pointer"
            onClick={() => toggleVariant()}
          >
            {" "}
            {variant === "LOGIN" ? "Register here" : "Login here"}
          </span>
        </span>
      </div>
    </form>
  );
}
