"use client";

import { useRouter } from "next/navigation";

const AppPage = () => {
  const router = useRouter();
  router.push('/app/cities');
  return null;
};

export default AppPage;
