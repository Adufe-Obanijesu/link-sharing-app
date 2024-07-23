import { ButtonType } from "@/types/utils";

export default function Button({ text, disabled, auto }: ButtonType) {
  return (
    <button className={`*:bg-primary hover:bg-primary-50 disabled:bg-primary/25 disabled:shadow-none disabled:cursor-not-allowed py-2 ${auto ? "md:w-auto w-full py-2 px-6" : "w-full"} text-white font-medium text-center hover:shadow-lg hover:shadow-primary/25`} disabled={disabled}>
      {text}
    </button>
  );
}
