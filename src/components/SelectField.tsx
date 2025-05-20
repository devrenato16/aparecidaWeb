import { Path, UseFormRegister, RegisterOptions, FieldError } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps<TFormValues> {
  label: string;
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  options: Option[];
  error?: FieldError;
  placeholder?: string;
  rules?: RegisterOptions;
  className?: string;
}

function SelectField<TFormValues>({
  label,
  name,
  register,
  options,
  error,
  placeholder = 'Selecione uma opção',
  rules = {},
  className = ''
}: SelectFieldProps<TFormValues>) {
  return (
    <div className={`mb-4 ${className}`}>
      <label 
        htmlFor={name} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <select
        id={name}
        className={`input-field ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
        {...register(name, rules)}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default SelectField;