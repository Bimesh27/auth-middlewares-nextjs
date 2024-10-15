"use server";

import connectDB from "@/database/connectDB";
import User from "@/models/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface FormData {
  email: string;
  password: string;
}

export async function loginUserAction(FormData: FormData) {
  await connectDB();
  try {
    const { email, password } = FormData;

    const checkUserExists = await User.findOne({ email });
    if (!checkUserExists) {
      return {
        success: false,
        message: "User doesnot exists ! Please signup first",
      };
    }

    const checkPasswordValid = await bcryptjs.compare(
      password,
      checkUserExists.password
    );
    if (!checkPasswordValid) {
      return {
        success: false,
        message: "Password is incorrect",
      };
    }

    const createTokenData = {
      id: checkUserExists._id,
      userName: checkUserExists.userName,
      email: checkUserExists.email,
    };
    const jwtSecret = process.env.JWT_SECRET;

    const token = jwt.sign(createTokenData, jwtSecret!, { expiresIn: "1d" });

    const getCookies = cookies();
    getCookies.set("token", token);

    return {
      success: true,
      message: "Login is successfull",
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return {
        success: false,
        message: error.message,
      };
    } else {
      console.log("Something went wrong while loging");
      return {
        success: false,
        message: "Something went wrong while loging",
      };
    }
  }
}
