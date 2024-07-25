"use client";
import Loader from "@/components/Loader";
import PreviewContent from "@/components/PreviewContent";
import { Suspense } from "react";

export default function Preview() {
  return (
    <Suspense fallback={<Loader large white />}>
      <PreviewContent />
    </Suspense>
  );
}
