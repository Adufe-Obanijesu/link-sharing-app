"use client"

import Button from "@/components/Button";
import Links from "@/components/Links/Links";
import NoLink from "@/components/Links/NoLink";
import { Context } from "@/components/SiteWrapper";
import { useContext } from "react";
import { platforms } from "@/components/Links/Link";

export default function Home() {

  const context = useContext(Context);

  const addLink = () => {
    context?.setLinks([
      ...context?.links,
      {
        platform: platforms[0].name,
        url: "",
      }
    ]);
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3>Customize your links</h3>
        <p>
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
      </div>

      <div className="space-y-4">
        <button className="secondary_btn w-full py-2 font-medium" onClick={addLink}>
          + Add new link
        </button>

        {/* <NoLink /> */}

        <Links />

        <div className="space-y-6 pt-4">
          <hr className="border-grey-50 mt-2 -mx-4" />

          <div className="flex justify-end">
            <Button text="Save" disabled={true} auto />
          </div>
        </div>
      </div>
    </div>
  );
}
