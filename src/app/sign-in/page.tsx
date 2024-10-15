"use client";
import React, { useState } from "react";
import {
  initialLoginFormData,
  userLoginFormControls,
} from "../utils/user-registration-form-control";
import { Label } from "@/components/ui/label";
import CommonFormElement from "@/components/form-element/common-form-element";
import { loginUserAction } from "@/actions/signInAction";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface LoginForm {
  email: string;
  password: string;
}

const SignIn = () => {
  const [signInFormData, setSignInFormData] =
    useState<LoginForm>(initialLoginFormData);
  const router = useRouter();

  const handleSignIn = async () => {
    const result = await loginUserAction(signInFormData);
    console.log(result);
    if (result?.success) {
      router.push("/");
    }
  };

  return (
    <div className="py-6 px-10">
      <h1>Login</h1>
      <form action={handleSignIn} className="flex flex-col gap-4">
        {userLoginFormControls.map((controlItem) => (
          <div key={controlItem.name}>
            <Label>{controlItem.label}</Label>
            <CommonFormElement
              currentItem={controlItem}
              value={signInFormData[controlItem.name as keyof LoginForm]}
              onChange={(event) =>
                setSignInFormData({
                  ...signInFormData,
                  [controlItem.name]: event.target.value,
                })
              }
            />
          </div>
        ))}
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
};

export default SignIn;
