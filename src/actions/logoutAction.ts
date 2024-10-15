'use server'

import { cookies } from "next/headers";

export async function logoutAction() {
  const getCookies = cookies();
  getCookies.set("token", "");
}
