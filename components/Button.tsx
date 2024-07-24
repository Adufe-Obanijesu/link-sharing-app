import { ButtonType } from "@/types/utils";
import Loader from "./Loader";

export default function Button({ text, disabled, auto, loading }: ButtonType) {
  return (
    <button className={`hv-center gap-2 bg-primary hover:bg-primary-50 disabled:bg-primary/25 disabled:shadow-none disabled:cursor-not-allowed py-2 ${auto ? "md:w-auto w-full py-2 px-6" : "w-full"} text-white font-medium text-center hover:shadow-lg hover:shadow-primary/25 focus:outline-none`} disabled={disabled}>
      {
        loading && <Loader />
      }
      {text}
    </button>
  );
}
