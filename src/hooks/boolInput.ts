import { useState } from 'react';

function useBoolInput(initialValue: boolean) {
  const [value, setValue] = useState(initialValue);

  return {
    onChange: () => {
      setValue(!value);
    },
    reset: () => setValue(initialValue),
    setValue,
    value
  }
}

export default useBoolInput;
