import { InputType } from "@/types/form";
import { handleForm } from "@/utils/form";

export function Input({
  label,
  placeholder,
  icon,
  name,
  value,
  setValue,
  error = false,
  type = "text",
}: InputType) {
  return (
    <div className="relative">
      <label
        htmlFor="inputField"
        className={`block text-sm mb-1 ${error ? "text-danger" : "text-dark"}`}
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-grey">
          {icon}
        </div>
        <input
          type={type}
          id="inputField"
          className={`block w-full pl-10 pr-3 py-3 ${
            error ? "border-danger" : "border-gray-300"
          } border-[1.5px] rounded-md leading-5 bg-transparent placeholder-gray-500 focus:outline-none focus:border-2 focus:border-primary-50 focus:shadow-lg focus:shadow-primary/15`}
          placeholder={placeholder}
          name={name}
          value={value[name]}
          onChange={(e) => handleForm(e, value, setValue)}
        />

        {error && (
          <div className="v-center absolute top-0 right-1 h-full">
            <span className="text-danger z-10 bg-white pr-3">
              Can&apos;t be empty
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
