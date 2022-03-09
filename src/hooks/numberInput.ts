import { useState } from 'react';
import type ValidationError from '../errors/ValidationError';

function useNumberInput(initialValue?: number, validationFunc?: (value: number) => boolean) {
  const [validationError, setValidationError] = useState<ValidationError | undefined>(undefined);
  const [value, setValue] = useState(initialValue);

  return {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value);
      const num = Number(event.target.value);
      setValue(num);
      
      if (validationFunc) {
        try {
          validationFunc(num);
          setValidationError(undefined);
        } catch (error) {
          if ((error as ValidationError).validationId) {
            setValidationError(error as ValidationError);
          }
        }
      }
    },
    reset: () => setValue(undefined),
    setValidationError,
    setValue,
    validationError,
    value
  }
}

export default useNumberInput;
