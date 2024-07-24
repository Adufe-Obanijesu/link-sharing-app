"use client";

import Button from "@/components/Button";
import { Input } from "@/components/Inputs";
import Logo from "@/components/Logo";
import { useAuth } from "@/firebase/auth";
import { FormData } from "@/types/form";
import { notify } from "@/utils/notification";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

// Icons
import { PiLockKeyFill, PiEnvelopeSimpleFill } from "react-icons/pi";

export default function Login() {

  const { login } = useAuth();
  const router = useRouter();

  const [ loading, setLoading ] = useState(false);

  const [loginData, setLoginData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [ validate, setValidate ] = useState({
    status: true,
    email: "",
    password: "",
  })

  const disable = !loginData.email && !loginData.password
  
  const validateLoginData = () => {
    const { email, password } = loginData;

    const response = {
      status: true,
      email: "",
      password: "",
    }
  
    // Check if fields are not empty
    if (!email) response.email = "Can't be empty";
    if (!password) response.password = "Can't be empty";

    if (!email || !password) response.status = false;

    return response;
  }
  
  const loginUser = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const validateForm = validateLoginData();
    setValidate(validateForm)
    if (!validateForm.status){
      setLoading(false);
      return;
    }
    
    try {
      const { email, password } = loginData;
      const response = await login({email, password});
      if (response.status) {
        notify("Logged in successfully. Redirecting...");
        router.push("/")
      } else {
        console.log(response)
        notify("Invalid credentials!", "error");
      }
    } catch(err: any) {
      notify("Error logging you up!", "error");
    } finally {
      setLoading(false);
    }

  }

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
            <form className="space-y-6" onSubmit={loginUser}>
              <Input
                type="email"
                name="email"
                label="Email address"
                placeholder="e.g. alex@email.com"
                icon={<PiEnvelopeSimpleFill />}
                value={loginData}
                setValue={setLoginData}
                error={validate}
              />
              <Input
                type="password"
                name="password"
                label="Password"
                placeholder="Enter your password"
                icon={<PiLockKeyFill />}
                value={loginData}
                setValue={setLoginData}
                error={validate}
              />
              <Button text="Login" loading={loading} disabled={loading || disable} />
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
