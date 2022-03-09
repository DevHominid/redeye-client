import { useState } from 'react';
import type ValidationError from '../errors/ValidationError';

function useTextInput(
  initialValue: string,
  validationFunc?: (value: string, ...args: any[]) => boolean
) {
  const [validationError, setValidationError] = useState<ValidationError | undefined>(undefined);
  const [value, setValue] = useState(initialValue);

  return {
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValue(event.target.value);
      
      if (validationFunc) {
        try {
          validationFunc(event.target.value);
          setValidationError(undefined);
        } catch (error) {
          if ((error as ValidationError).validationId) {
            setValidationError(error as ValidationError);
          }
        }
      }
    },
    reset: (value?: string) => setValue(value || ''),
    setValidationError,
    setValue,
    validationError,
    value
  }
}

export default useTextInput;
