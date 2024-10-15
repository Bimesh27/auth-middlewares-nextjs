"use client";

import { Label } from "@/components/ui/label";
import {
  initialSignUpFormData,
  userRegistrationFormControl,
} from "../utils/user-registration-form-control";
import CommonFormElement from "@/components/form-element/common-form-element";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { registerUserAction } from "@/actions/signUpAction";
import { useRouter } from "next/navigation";

interface SignUpFormData {
  userName: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [signUpFormData, setSignUpFormData] = useState<SignUpFormData>(
    initialSignUpFormData
  );
  const router = useRouter();

  const handleSubmitSignUpBtnDisable = () => {
    return Object.values(signUpFormData).every((value) => value.trim() !== "");
  };

  const handleSignUp = async() => {
    const result = await registerUserAction(signUpFormData);
    console.log(result);
    
    if(result?.data) {
      router.push("/sign-in");
    }
  }

  return (
    <div className="py-6 px-10 w-full">
      <h1 className="text-center uppercase font-semibold">Registration</h1>
      <form className="flex flex-col gap-4" action={handleSignUp}>
        {userRegistrationFormControl.map((controlItem) => (
          <div>
            <Label>{controlItem.label}</Label>
            <CommonFormElement
              currentItem={controlItem}
              value={signUpFormData[controlItem.name as keyof SignUpFormData]}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setSignUpFormData({
                  ...signUpFormData,
                  [controlItem.name]: event.target.value,
                })
              }
            />
          </div>
        ))}
        <Button type="submit" disabled={!handleSubmitSignUpBtnDisable()}>
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
