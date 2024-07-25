"use client";

import { ContextProperties } from "@/types/utils";
import { getAuth, onAuthStateChanged } from "@/firebase";
import {
  ReactNode,
  useState,
  createContext,
  useEffect,
  useCallback,
} from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFetch } from "@/firebase/firestore";
export const Context = createContext<ContextProperties | null>(null);

const auth = getAuth();

export default function SiteWrapper({ children }: { children: ReactNode }) {
  const { getQueriedDocs } = useFetch();

  const [user, setUser] = useState<any>(null);
  const [userDetails, setUserDetails] = useState<any>(null);

  const getUser = useCallback(async () => {
    if (!user) return;
    try {
      if (user) {
        const response = await getQueriedDocs({
          config: {
            collectionName: "users",
            where: [
              {
                fieldPath: "register_email",
                opStr: "==",
                value: user.email,
              },
            ],
          },
        });

        if (response.status && response.data) {
          setUserDetails(response.data[0]);
        }
      }
    } catch (err) {}
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser, user]);

  return (
    <Context.Provider
      value={{
        user,
        userDetails,
        setUserDetails,
      }}
    >
      {children}
      <ToastContainer />
    </Context.Provider>
  );
}
