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
  links: {
    platform: string;
    url: string;
  }[],
  setLinks: Dispatch<SetStateAction<Links>>
}

type Links = {
  platform: string;
  url: string;
}[]

export type { ButtonType, PopupContextProperties, ContextProperties, Links };
