"use client";

import { useContext } from "react";
import { Context } from "./SiteWrapper";

export default function PreviewNavbar() {
  const context = useContext(Context);

  return (
    <nav className="v-center justify-between p-4 rounded-lg md:mt-4 bg-white relative z-50">
      {context?.userDetails ? (
        <button className="secondary_btn py-2 px-6">Back to Editor</button>
      ) : (
        <div></div>
      )}

      <button className="bg-primary hover:bg-primary-50 disabled:cursor-not-allowed py-2 px-6 text-white font-medium text-center hover:shadow-lg hover:shadow-primary/25">
        Share Link
      </button>
    </nav>
  );
}
