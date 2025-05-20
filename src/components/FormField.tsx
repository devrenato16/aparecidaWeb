import { ReactNode } from 'react';
import { Path, UseFormRegister, RegisterOptions, FieldError } from 'react-hook-form';

interface FormFieldProps<TFormValues> {
  label: string;
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  error?: FieldError;
  type?: string;
  placeholder?: string;
  options?: RegisterOptions;
  children?: ReactNode;
  className?: string;
}

function FormField<TFormValues>({ 
  label, 
  name, 
  register, 
  error, 
  type = 'text', 
  placeholder = '', 
  options = {}, 
  children,
  className = ''
}: FormFieldProps<TFormValues>) {
  return (
    <div className={`mb-4 ${className}`}>
      <label 
        htmlFor={name} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      
      {children ? (
        children
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          className={`input-field ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
          {...register(name, options)}
        />
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default FormField;