"use client";

import Button from "@/components/Button";
import { Input } from "@/components/Inputs";
import Logo from "@/components/Logo";
import { FormData } from "@/types/form";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useAuth } from "@/firebase/auth";
import { useAddDoc } from "@/firebase/firestore";

// Icons
import { PiLockKeyFill, PiEnvelopeSimpleFill } from "react-icons/pi";
import { notify } from "@/utils/notification";
import { useRouter } from "next/navigation";

export default function Signup() {

  const { signup, removeUser } = useAuth();
  const { addDocument } = useAddDoc();
  const router = useRouter();

  const [ loading, setLoading ] = useState(false);

  const [signupData, setSignupData] = useState<FormData>({
    email: "",
    password: "",
    confirm_password: "",
  });

  const disable = !signupData.email && !signupData.password && !signupData.confirm_password;

  const [ validate, setValidate ] = useState({
    status: true,
    email: "",
    password: "",
    confirm_password: "",
  })

  const validateSignupData = () => {
    const { email, password, confirm_password } = signupData;

    const response = {
      status: true,
      email: "",
      password: "",
      confirm_password: "",
    }
  
    // Check if fields are not empty
    if (!email) response.email = "Can't be empty";
    if (!password) response.password = "Can't be empty";
    if (!confirm_password) response.confirm_password = "Can't be empty";

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) response.email = "Invalid email";
    
    // Check password length
    if (password.length < 8) response.password = "Too short";
    
    // Check if passwords match
    if (password !== confirm_password) response.confirm_password = "Not a match";

    if (!email || !password || !confirm_password || !emailRegex.test(email) || password.length < 8 || password !== confirm_password) response.status = false;

    return response;
  }
  
  const signupUser = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const validateForm = validateSignupData();
    setValidate(validateForm)
    if (!validateForm.status){
      setLoading(false);
      return;
    }
    
    try {
      const { email, password } = signupData;
      const response = await signup({email, password});
      if (response.status) {
        const response = await addDocument({
          config: {
            collectionName: "users",
          },
          data: {
            register_email: email,
            first_name: "",
            last_name: "",
            email: "",
            links: [],
          },
        })

        if (response.status) {
          notify("Signed up successfully. Redirecting...");
          router.push("/")
        } else {
          await removeUser();
          notify("Error signing you up!", "error");
        }

      } else {
        notify("Error signing you up!", "error");
      }
    } catch(err) {
      notify("Error signing you up!", "error");
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
            <h3>Create account</h3>
            <p className="text-lg">
            Let&apos;s get you started sharing your links!
            </p>
          </div>

          <div className="space-y-6">
            <form className="space-y-6" onSubmit={signupUser}>
              <Input
                type="email"
                name="email"
                label="Email address"
                placeholder="e.g. alex@email.com"
                icon={<PiEnvelopeSimpleFill />}
                value={signupData}
                setValue={setSignupData}
                error={validate}
              />
              <Input
                type="password"
                name="password"
                label="Create password"
                placeholder="At least 8 characters"
                icon={<PiLockKeyFill />}
                value={signupData}
                setValue={setSignupData}
                error={validate}
              />
              <Input
                type="password"
                name="confirm_password"
                label="Confirm password"
                placeholder="At least 8 characters"
                icon={<PiLockKeyFill />}
                value={signupData}
                setValue={setSignupData}
                error={validate}
              />

              <p className="text-sm">
                Password must contain at least 8 characters
              </p>

              <Button text="Create new account" loading={loading} disabled={loading || disable} />
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
