"use server";

import connectDB from "@/database/connectDB";
import User from "@/models/User";
import bcryptjs from "bcryptjs";

interface formData {
  userName: string;
  email: string;
  password: string;
}

export const registerUserAction = async (formData: formData) => {
  await connectDB();
  try {
    const { userName, email, password } = formData;
    const checkAlreadyExistUser = await User.findOne({ email });

    if (checkAlreadyExistUser) {
      return {
        message: "User already exists! try with different email",
        success: false,
      };
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newlyCreatedUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newlyCreatedUser.save();

    if (savedUser) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(savedUser)),
      };
    } else {
      return {
        success: false,
        message: "Something went wrong !Please try again",
      };
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error during user registration:", error.message);
      return {
        message: error.message,
        success: false,
      };
    } else {
      console.error("An unknown error occurred during user registration");
      return {
        message: "An unknown error occurred during user registration",
        success: false,
      };
    }
  }
};
