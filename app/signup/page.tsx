"use client";

import Button from "@/components/Button";
import { Input } from "@/components/Inputs";
import Logo from "@/components/Logo";
import { FormData } from "@/types/form";
import Link from "next/link";
import { useState } from "react";

// Icons
import { PiLockKeyFill, PiEnvelopeSimpleFill } from "react-icons/pi";

export default function Signup() {
  const [loginData, setLoginData] = useState<FormData>({
    email: "",
    password: "",
    confirm_password: "",
  });

  return (
    <main className="md:py-10 py-8 flex md:justify-center">
      <section className="">
        <div className="flex md:justify-center ml-8 md:ml-0">
          <Logo />
        </div>

        <div className="md:bg-white rounded-xl md:p-10 p-8 md:mt-12 mt-16 space-y-10 md:w-[476px]">
          <div className="space-y-2">
            <h3>Create account</h3>
            <p className="text-lg">
            Let&apos;s get you started sharing your links!
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
                label="Create password"
                placeholder="At least 8 characters"
                icon={<PiLockKeyFill />}
                value={loginData}
                setValue={setLoginData}
              />
              <Input
                type="password"
                name="confirm_password"
                label="Confirm password"
                placeholder="At least 8 characters"
                icon={<PiLockKeyFill />}
                value={loginData}
                setValue={setLoginData}
              />

              <p className="text-sm">
                Password must contain at leat 8 characters
              </p>

              <Button text="Create new account" />
            </form>

            <div className="text-center md:flex gap-2 justify-center">
              <p className="text-grey">Already have an account?</p>
              <Link href="/login" className="text-primary">Login</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
