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
  setUserDetails: Dispatch<SetStateAction<any>>
}

type LinksProperties = {
  id: string;
  name: Platform;
  url: string;
  error: string;
};

type Platform =
  | "Github"
  | "Youtube"
  | "LinkedIn"
  | "Facebook"
  | "Frontend Mentor";

interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export type {
  ButtonType,
  PopupContextProperties,
  ContextProperties,
  LinksProperties,
  Platform,
  ValidationResult,
};
