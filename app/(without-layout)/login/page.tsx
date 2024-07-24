"use client";

import Button from "@/components/Button";
import { Input } from "@/components/Inputs";
import Logo from "@/components/Logo";
import { FormData } from "@/types/form";
import Link from "next/link";
import { useState } from "react";

// Icons
import { PiLockKeyFill, PiEnvelopeSimpleFill } from "react-icons/pi";

export default function Login() {
  const [loginData, setLoginData] = useState<FormData>({
    email: "",
    password: "",
  });

  return (
    <main className="md:py-10 py-8 flex md:justify-center">
      <section className="">
        <div className="flex md:justify-center ml-8 md:ml-0">
          <Logo />
        </div>

        <div className="md:bg-white rounded-xl md:p-10 p-8 md:mt-12 mt-16 space-y-10 md:w-[476px]">
          <div className="space-y-2">
            <h3>Login</h3>
            <p className="text-lg">
              Add your details below to get back into the app
            </p>
          </div>

          <div className="space-y-6">
            <form className="space-y-6">
              <Input
                type="email"
                name="email"
                label="Email address"
                placeholder="e.g. alex@email.com"
                icon={<PiEnvelopeSimpleFill />}
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
                error={{
                    status: true,
                    message: "Cannot be empty",
                }}
              />
              <Button text="Login" />
            </form>

            <div className="text-center md:flex gap-2 justify-center">
              <p className="text-grey">Don&apos;t have an account?</p>
              <Link href="/signup" className="text-primary">Create account</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
