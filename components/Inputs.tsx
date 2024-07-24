import { GridInputType, InputType, InputType2 } from "@/types/form";
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
        className={`block text-sm mb-1 ${error?.[name] ? "text-danger" : "text-dark"}`}
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
            error?.[name] ? "border-danger" : "border-grey-50"
          } border group rounded-md leading-5 bg-transparent placeholder-grey focus:outline-none focus:border-primary focus:shadow-input`}
          placeholder={placeholder}
          name={name}
          value={value[name]}
          onChange={(e) => handleForm(e, value, setValue)}
        />

        {error?.[name] && (
          <label htmlFor={name} className="v-center absolute top-0 right-[.5px] h-full">
            <span className="text-danger z-10 bg-white py-2 rounded-r-md px-3">
              {error?.[name]}
            </span>
          </label>
        )}
      </div>
    </div>
  );
}

export function Input2({
  label,
  placeholder,
  icon,
  name,
  value,
  setValue,
  error,
  type = "text",
}: InputType2) {
  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={`block text-sm mb-1 ${error?.[name] ? "text-danger" : "text-dark"}`}
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
            error?.[name] ? "border-danger" : "border-grey-50"
          } border group rounded-md leading-5 bg-transparent placeholder-grey focus:outline-none focus:border-primary focus:shadow-input`}
          placeholder={placeholder}
          name={name}
          value={value[name]}
          onChange={(e) => handleForm(e, value, setValue)}
        />

        {error?.[name] && (
          <label htmlFor={name} className="v-center absolute top-0 right-[.5px] h-full">
            <span className="text-danger z-10 bg-white py-2 rounded-r-md px-3">
              {error?.[name]}
            </span>
          </label>
        )}
      </div>
    </div>
  );
}

export function GridInput({
  label,
  placeholder,
  name,
  value,
  setValue,
  error,
  type = "text",
}: GridInputType) {
  return (
    <div className="grid md:grid-cols-5 gap-0">
      <label
        htmlFor={name}
        className={`block mb-1 v-center md:col-span-2 ${error?.[name] ? "text-danger" : "text-dark"}`}
      >
        {label}
      </label>
      <div className="md:col-span-3">
        <input
          type={type}
          id={name}
          className={`block w-full px-4 py-3 ${
            error?.[name] ? "border-danger" : "border-grey-50"
          } border group rounded-md leading-5 bg-transparent placeholder-grey focus:outline-none focus:border-primary focus:shadow-input`}
          placeholder={placeholder}
          name={name}
          value={value[name]}
          onChange={(e) => handleForm(e, value, setValue)}
        />

        {error?.[name] && (
          <label htmlFor={name} className="v-center absolute top-0 right-[.5px] h-full">
            <span className="text-danger z-10 bg-white py-2 rounded-r-md px-3">
              {error?.[name]}
            </span>
          </label>
        )}
      </div>
    </div>
  );
}
