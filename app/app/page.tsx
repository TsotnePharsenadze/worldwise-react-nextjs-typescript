import getCurrentUser from "@/actions/getCurrentUser";
import { signOut } from "next-auth/react";

const AppPage = async () => {
  const user = await getCurrentUser();
  console.log(user);
  return <button>Sign out</button>;
};

export default AppPage;
