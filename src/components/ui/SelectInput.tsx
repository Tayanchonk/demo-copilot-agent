import React from 'react';
import Select from 'react-select';
import { useController, type Control } from 'react-hook-form';

export interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  options: Option[];
  placeholder?: string;
  isMulti?: boolean;
  isSearchable?: boolean;
  isDisabled?: boolean;
  error?: string;
  label?: string;
  required?: boolean;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules?: any; // Validation rules
}

const SelectInput: React.FC<SelectInputProps> = ({
  name,
  control,
  options,
  placeholder = 'Select...',
  isMulti = false,
  isSearchable = true,
  isDisabled = false,
  error,
  label,
  required = false,
  className = '',
  rules,
}) => {
  const { field } = useController({
    name,
    control,
    rules: rules || (required ? { required: `${label || name} is required` } : {}),
  });

  // Convert string value to Option object for react-select
  const getValue = () => {
    if (!field.value) return isMulti ? [] : null;
    
    if (isMulti) {
      if (Array.isArray(field.value)) {
        return field.value.map((val: string | Option) => 
          typeof val === 'string' 
            ? options.find(opt => opt.value === val) || { value: val, label: val }
            : val
        );
      }
      return [];
    } else {
      if (typeof field.value === 'string') {
        return options.find(opt => opt.value === field.value) || { value: field.value, label: field.value };
      }
      return field.value;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (selected: any) => {
    if (isMulti) {
      // For multi-select, return array of values
      field.onChange(selected ? selected.map((opt: Option) => opt.value) : []);
    } else {
      // For single select, return the value or null
      field.onChange(selected ? selected.value : null);
    }
  };

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Select
        inputId={name}
        options={options}
        placeholder={placeholder}
        isMulti={isMulti}
        isSearchable={isSearchable}
        isDisabled={isDisabled}
        className={`react-select-container ${error ? 'react-select-error' : ''}`}
        classNamePrefix="react-select"
        onChange={handleChange}
        value={getValue()}
        styles={{
          control: (provided, state) => ({
            ...provided,
            borderColor: error 
              ? '#f87171' 
              : state.isFocused 
                ? '#6366f1' 
                : '#d1d5db',
            boxShadow: state.isFocused 
              ? '0 0 0 1px #6366f1' 
              : 'none',
            '&:hover': {
              borderColor: error ? '#f87171' : '#9ca3af',
            },
          }),
        }}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectInput;