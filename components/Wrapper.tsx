"use client";

import { ReactNode, useEffect } from "react";
import { useState, createContext } from "react";

import Navbar from "./Navbar";
import PhoneMockup from "./PhoneMockup";
import { PopupContextProperties } from "@/types/utils";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const PopupContext = createContext<PopupContextProperties | null>(null);

export default function Wrapper({ children }: { children: ReactNode }) {
  const [cancelPopup, setCancelPopup] = useState(0);
  const auth = getAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
        return;
      }
      setLoading(false);
    });
    return () => {
      unsub();
    };
  }, [router, auth]);

  return (
    <PopupContext.Provider
      value={{
        cancelPopup,
        setCancelPopup,
      }}
    >
      <div onClick={() => setCancelPopup(cancelPopup + 1)}>
        <Navbar />
        <main className="md:px-6 px-4">
          <div className="grid lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2 hidden lg:flex justify-center bg-white p-10 rounded-lg">
              <PhoneMockup />
            </div>

            <div className="lg:col-span-3 md:py-10 md:px-10 px-6 rounded-lg bg-white space-y-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </PopupContext.Provider>
  );
}
