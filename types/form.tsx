import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from "react";

interface InputType {
  label: string;
  placeholder: string;
  icon?: ReactNode;
  name: ("email" | "password" | "confirm_password");
  value: Record<string, string>;
  setValue: Dispatch<React.SetStateAction<Record<string, string>>>;
  type?: string;
  error?: {
    status: boolean;
    email: string;
    password: string;
    confirm_password?: string;
  };
}

interface InputType2 {
  label: string;
  placeholder: string;
  icon?: ReactNode;
  name: "url";
  value: Record<string, string>;
  setValue: Dispatch<React.SetStateAction<Record<string, string>>>;
  type?: string;
  error?: {
    status: boolean;
    url: string;
  };
}

interface GridInputType {
  label: string;
  placeholder: string;
  icon?: ReactNode;
  name: ("email" | "first_name" | "last_name");
  value: Record<string, string>;
  setValue: Dispatch<React.SetStateAction<Record<string, string>>>;
  type?: string;
  error?: {
    status: boolean;
    email: string;
    first_name: string;
    last_name: string;
  };
}

type FormData = Record<string, string>;

type InputEvent =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLSelectElement>;

type HandleFormType = (
  e: InputEvent,
  data: Record<string, string>,
  setData: Dispatch<React.SetStateAction<Record<string, string>>>
) => void;

export type { InputType, InputType2, FormData, InputEvent, HandleFormType, GridInputType };
