
import { useState, ChangeEvent, FormEvent } from 'react';

interface UseFormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
}

export const useForm = <T extends Record<string, any>>({ initialValues, onSubmit }: UseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    setValues((prev) => ({ ...prev, [name]: val }));
  };

  const handleManualChange = (name: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  const resetForm = () => setValues(initialValues);

  return {
    values,
    setValues,
    handleChange,
    handleManualChange,
    handleSubmit,
    resetForm,
  };
};
