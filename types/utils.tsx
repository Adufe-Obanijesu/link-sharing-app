import { Dispatch, SetStateAction } from "react";

interface ButtonType {
  text: string;
  disabled?: boolean;
  auto?: boolean;
}

interface PopupContextProperties {
  cancelPopup: number;
  setCancelPopup: Dispatch<SetStateAction<number>>;
}

export type { ButtonType, PopupContextProperties };
