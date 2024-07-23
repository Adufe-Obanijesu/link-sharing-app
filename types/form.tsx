import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from "react";

interface InputType {
  label: string;
  placeholder: string;
  icon: ReactNode;
  name: string;
  value: Record<string, string>;
  setValue: Dispatch<React.SetStateAction<Record<string, string>>>;
  type?: string;
  error?: {
    status: boolean;
    message: string;
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

export type { InputType, FormData, InputEvent, HandleFormType };
