import connectDB from "@/database/connectDB";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User";

interface DecodedToken {
  id: string;
  userName: string;
  email: string;
}

export async function fetchAuthUserAction() {
  await connectDB();
  try {
    const getCookies = cookies();
    const token = getCookies.get("token")?.value || "";
    if (token === "") {
      return {
        success: false,
        message: "Token is invalid",
      };
    }
    const jwtSecret = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, jwtSecret!) as DecodedToken;

    const getUserInfo = await User.findOne({ _id: decodedToken.id });
    if (getUserInfo) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(getUserInfo)),
      };
    } else {
      return {
        success: false,
        message: "Some error occured! Please try again",
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return {
        success: false,
        message: error.message,
      };
    } else {
      console.log("Something went wrong while fetching User");
      return {
        success: false,
        message: "Something went wrong while fetching User",
      };
    }
  }
}
