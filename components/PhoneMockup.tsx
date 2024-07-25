"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "./SiteWrapper";
import Loader from "./Loader";
import { platform_color, platform_icons, platforms } from "./Platforms";
import { LinksProperties } from "@/types/utils";
import { FaArrowRight } from "react-icons/fa";
import { collection, db, onSnapshot, query, where } from "@/firebase";
import Link from "next/link";
import Image from "next/image";

const PhoneMockup = () => {
  const context = useContext(Context);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getLinks = useCallback(async () => {
    if (context?.userDetails) {
      setLoading(true);

      const colRef = collection(db, "users");
      const q = query(
        colRef,
        where("register_email", "==", context?.userDetails.register_email)
      );

      onSnapshot(q, (snapshot: any) => {
        const arr = snapshot.docs.map((doc: any) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(arr[0].links);
        setLoading(false);
      });
    }
  }, [context?.userDetails]);

  useEffect(() => {
    getLinks();
  }, [getLinks]);

  if (!context?.userDetails || loading) {
    return (
      <div className="hv-center">
        <Loader large />
      </div>
    );
  }

  const unlinked = new Array(platforms.length - data.length).fill("");

  return (
    <div className="relative">
      <object
        type="image/svg+xml"
        data="/svgs/mobile.svg"
        title="phone mockup"
        className={`w-full h-auto`}
      >
        Your browser does not support SVG
      </object>

      <div className="absolute top-0 left-0 w-full px-3">
        <div className="mt-20 h-center w-full">
          <div className="flex flex-col w-full items-center gap-2">
            {context && context?.userDetails.profileImage ? (
              <Image
                src={context.userDetails.profileImage}
                alt={context.userDetails.email}
                width={1000}
                height={1000}
                className="h-32 w-32 rounded-full"
              />
            ) : (
              <div className="h-32 w-32 bg-lightgrey rounded-full"></div>
            )}
            {context ? (
              <h4 className="text-xl capitalize font-medium">
                {context?.userDetails.first_name}{" "}
                {context?.userDetails.last_name}
              </h4>
            ) : (
              <div className="h-5 w-2/3 mt-2 bg-lightgrey rounded-lg"></div>
            )}
            {context ? (
              <p className="font-medium">{context?.userDetails.email}</p>
            ) : (
              <div className="h-5 w-2/3 mt-2 bg-lightgrey rounded-lg"></div>
            )}
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-5 px-6">
          {data &&
            data.map((each: LinksProperties) => {
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

          {unlinked.map((each: unknown, index) => (
            <div
              key={index}
              className="w-full h-10 rounded-lg bg-lightgrey"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
