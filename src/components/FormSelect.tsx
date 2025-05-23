// components/forms/FormSelect.tsx
import { FieldError } from "react-hook-form";

type FormSelectProps = {
  label: string;
  name: string;
  register: any;
  error?: FieldError;
  options: Array<{ value: string; label: string }>;
  className?: string;
};

export const FormSelect = ({
  label,
  name,
  register,
  error,
  options,
  className,
}: FormSelectProps) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block mb-2 font-medium">
        {label}
      </label>
      <select
        id={name}
        {...register(name)}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="">Selecione</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};
