import { useContext } from "react";
import { Context } from "./SiteWrapper";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { notify } from "@/utils/notification";

export default function PreviewNavbar({ uid }: { uid: string | null }) {
  const context = useContext(Context);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const fullUrl =
    typeof window !== "undefined"
      ? window.location.origin + pathname + searchParams.toString()
      : "";

  const copy = () => {
    notify("Link copied");
  };

  return (
    <nav className="v-center justify-between p-4 rounded-lg md:mt-4 bg-white relative z-50">
      {context?.userDetails && context?.userDetails.id == uid ? (
        <Link href="/">
          <button className="secondary_btn py-2 px-6">Back to Editor</button>
        </Link>
      ) : (
        <div></div>
      )}

      <CopyToClipboard text={fullUrl} onCopy={copy}>
        <button className="bg-primary hover:bg-primary-50 disabled:cursor-not-allowed py-2 px-6 text-white font-medium text-center hover:shadow-lg hover:shadow-primary/25">
          Share Link
        </button>
      </CopyToClipboard>
    </nav>
  );
}
