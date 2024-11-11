"use client";

import React from "react";
import Button from "./Button/Button";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        router.back();
      }}
      type="back"
    >
      &larr; Back
    </Button>
  );
};

export default BackButton;
