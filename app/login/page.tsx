"use client";

import Button from "@/components/Button";
import { Input } from "@/components/Inputs";
import Logo from "@/components/Logo";
import { LoginData } from "@/types/form";
import { useState } from "react";

// Icons
import { HiMail } from "react-icons/hi";
import { PiLockKeyFill } from "react-icons/pi";

export default function Login() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  return (
    <main className="px-24 py-10 flex md:justify-center">
      <section className="">
        <div className="flex md:justify-center">
          <Logo />
        </div>

        <div className="md:bg-white rounded-lg p-8 mt-20 md:mt-10">
          <div className="space-y-2">
            <h3>Login</h3>
            <p className="text-lg">
              Add your details below to get back into the app
            </p>
          </div>

          <div className="mt-6 space-y-6">
            <form className="space-y-4">
              <Input
                type="email"
                name="email"
                label="Email address"
                placeholder="e.g. alex@email.com"
                icon={<HiMail />}
                value={loginData}
                setValue={setLoginData}
              />
              <Input
                type="password"
                name="password"
                label="Password"
                placeholder="Enter your password"
                icon={<PiLockKeyFill />}
                value={loginData}
                setValue={setLoginData}
                error
              />
              <Button text="Login" />
            </form>

            <div className="text-center md:flex gap-2 justify-center">
              <p className="text-grey">Don&apos;t have an account?</p>
              <p className="text-primary">Create account</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
