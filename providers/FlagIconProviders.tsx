"use client";

import { useEffect } from "react";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";

const Polyfill = () => {
  useEffect(() => {
    polyfillCountryFlagEmojis();
  }, []);

  return null;
};

export default Polyfill;
