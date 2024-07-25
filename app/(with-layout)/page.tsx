"use client";

import Button from "@/components/Button";
import Links from "@/components/Links/Links";
import NoLink from "@/components/Links/NoLink";
import { Context } from "@/components/SiteWrapper";
import { FormEvent, useContext, useEffect, useState } from "react";
import { LinksProperties } from "@/types/utils";
import { nanoid } from "nanoid";
import { useUpdateDoc } from "@/firebase/firestore";
import { notify } from "@/utils/notification";
import Loader from "@/components/Loader";
import { platforms } from "@/components/Platforms";

export default function Home() {
  const context = useContext(Context);

  const { updateDocument } = useUpdateDoc();

  const [loading, setLoading] = useState(false);

  const [links, setLinks] = useState<LinksProperties[]>([]);

  useEffect(() => {
    if (!context?.userDetails) return;
    if (context?.userDetails?.links.length > 0) {
      setLinks([...context?.userDetails.links]);
    }
  }, [context]);

  const addLink = () => {
    setLinks([
      ...links,
      {
        id: nanoid(),
        name: platforms[0],
        url: "",
        error: "",
      },
    ]);
  };

  const save = async (e: FormEvent) => {
    e.preventDefault();

    const resetLinks = links.map((each) => {
      return {
        ...each,
        error: "",
      };
    });
    setLinks(resetLinks);

    // check for errors
    let error = false;
    const newLinks = links.map((each) => {
      if (!each.url) {
        error = true;
        return {
          ...each,
          error: "Can't be empty",
        };
      }
      return each;
    });

    if (error) {
      notify("Fill in all fields", "error");
      setLinks(newLinks);
      return;
    }

    setLoading(true);

    try {
      const response = await updateDocument({
        id: context?.userDetails.id,
        fieldPath: "users",
        data: {
          links: resetLinks,
        },
      });

      if (response.status) {
        notify("Links updated");
      } else {
        notify("Error updating links", "error");
      }
    } catch (err) {
      notify("Error updating links", "error");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (!context?.userDetails) {
    return (
      <div className="hv-center">
        <Loader large />
      </div>
    );
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
        <button
          className="secondary_btn w-full py-2 font-medium"
          onClick={addLink}
        >
          + Add new link
        </button>

        {links.length === 0 ? (
          <NoLink />
        ) : (
          <Links links={links} setLinks={setLinks} />
        )}

        <div className="space-y-6 pt-4">
          <hr className="border-grey-50 mt-2 -mx-4" />

          <div className="flex justify-end">
            <form onSubmit={save}>
              <Button text="Save" loading={loading} disabled={loading} auto />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
