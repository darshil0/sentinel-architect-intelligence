import { useState, useCallback, ChangeEvent } from 'react';

export const useForm = <T extends Record<string, unknown>>(initialState: T) => {
  const [formData, setFormData] = useState<T>(initialState);

  const handleChange = useCallback((
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialState);
  }, [initialState]);

  const setFieldValue = useCallback((
    name: keyof T,
    value: T[keyof T]
  ) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  return {
    formData,
    handleChange,
    resetForm,
    setFormData,
    setFieldValue, // Programmatic updates
  };
};
