"use client";

import PreviewNavbar from "@/components/PreviewNavbar";

// icons
import { FaArrowRight } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { notify } from "@/utils/notification";
import Loader from "@/components/Loader";
import Image from "next/image";
import Link from "next/link";
import { platform_color, platform_icons } from "@/components/Platforms";
import { LinksProperties } from "@/types/utils";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default function PreviewContent() {
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>();

  const db = getFirestore();

  const getDetails = useCallback(async () => {
    if (!uid) return;
    setLoading(true);
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDetails(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      notify("Unable to get user details! Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    getDetails();
  }, [getDetails]);

  return (
    <section className="md:px-4">
      <div className="hidden md:block absolute top-0 left-0 h-[300px] bg-primary w-full rounded-b-[32px] z-0"></div>

      <div className="md:space-y-24">
        <PreviewNavbar uid={uid} />
        <div className="md:flex justify-center z-10 relative">
          {loading && !details && (
            <div className="hv-center absolute w-screen pt-6 md:pt-0">
              <Loader large white />
            </div>
          )}
          {details && (
            <div className="bg-white xl:w-2/5 lg:w-2/5 md:w-3/5 rounded-xl p-8 md:shadow-md">
              <div className="w-full px-3">
                <div className="h-center w-full">
                  <div className="flex flex-col w-full items-center gap-2">
                    {details.profileImage ? (
                      <img
                        src={details?.profileImage}
                        alt={details?.email}
                        className="h-32 w-32 rounded-full"
                      />
                    ) : (
                      <div className="h-32 w-32 bg-lightgrey rounded-full"></div>
                    )}
                    {details.first_name && (
                      <>
                        <h4 className="text-xl capitalize font-medium">
                          {details?.first_name} {details?.last_name}
                        </h4>
                        <p className="font-medium">{details?.email}</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-5 px-6">
                  {details?.links.map((each: LinksProperties) => {
                    return (
                      <Link
                        href={each.url}
                        key={each.id}
                        className={`w-full h-10 rounded-lg px-4 v-center justify-between ${
                          platform_color[each.name]
                        } text-white`}
                      >
                        <div className="v-center gap-2">
                          {platform_icons[each.name]}
                          <span>{each.name}</span>
                        </div>

                        <FaArrowRight className="2xl" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
