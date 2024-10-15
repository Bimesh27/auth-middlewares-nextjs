import { fetchAuthUserAction } from "@/actions/userFetchAction";
import Logout from "@/components/log-out/logout";
import { redirect } from "next/navigation";
import React from "react";

const Home = async () => {
  const currentUser = await fetchAuthUserAction();
  console.log(currentUser);
  if (!currentUser.success) redirect("/sign-in");
  return (
    <div>
      <h1>Nextjs auth</h1>
      <h1>{currentUser?.data?.userName}</h1>
      <h1>{currentUser?.data?.email}</h1>
      <Logout/>
    </div>
  );
};

export default Home;
