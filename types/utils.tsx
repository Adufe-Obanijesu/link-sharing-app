import { Dispatch, SetStateAction } from "react";

interface ButtonType {
  text: string;
  disabled?: boolean;
  auto?: boolean;
  loading?: boolean;
}

interface PopupContextProperties {
  cancelPopup: number;
  setCancelPopup: Dispatch<SetStateAction<number>>;
}

interface ContextProperties {
  user: any;
  userDetails: any;
}

export type { ButtonType, PopupContextProperties, ContextProperties };
