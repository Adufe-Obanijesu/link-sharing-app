import { InputType } from "@/types/form";
import { handleForm } from "@/utils/form";

export function Input({
  label,
  placeholder,
  icon,
  name,
  value,
  setValue,
  error,
  type = "text",
}: InputType) {
  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={`block text-sm mb-1 ${error?.status ? "text-danger" : "text-dark"}`}
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-grey">
          {icon}
        </div>
        <input
          type={type}
          id={name}
          className={`block w-full pl-10 pr-4 py-3 ${
            error ? "border-danger" : "border-grey-50"
          } border group rounded-md leading-5 bg-transparent placeholder-grey focus:outline-none focus:border-primary focus:shadow-input`}
          placeholder={placeholder}
          name={name}
          value={value[name]}
          onChange={(e) => handleForm(e, value, setValue)}
        />

        {error?.status && (
          <label htmlFor={name} className="v-center absolute top-0 right-1 h-full">
            <span className="text-danger z-10 bg-white pr-3">
              {error?.message}
            </span>
          </label>
        )}
      </div>
    </div>
  );
}
