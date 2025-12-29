import { useState, ChangeEvent } from 'react';

export const useForm = <T extends Record<string, unknown>>(initialState: T) => {
  const [formData, setFormData] = useState<T>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialState);
  };

  return {
    formData,
    handleChange,
    resetForm,
    setFormData,
  };
};
