import { ButtonType } from "@/types/utils";

export default function Button({ text }: ButtonType) {
  return (
    <button className="bg-primary hover:bg-primary-50 py-2 w-full text-white font-medium text-center hover:shadow-lg hover:shadow-primary/25">
      {text}
    </button>
  );
}
