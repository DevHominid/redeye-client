import type ValidationError from '../../../errors/ValidationError';
import globalStyles from '../../../common/global.module.css';
import styles from './NumberInput.module.css';

type NumberInputProps = {
  id: string;
  label?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  validationError?: ValidationError;
  value?: number;
};

export default function NumberInput({
  id,
  label,
  onChange,
  placeholder,
  required,
  validationError,
  value
}: NumberInputProps) {
  return (
    <label
      className={`${styles.NumberInput} ${validationError ? globalStyles.validationError : ''}`}
      htmlFor={id}
    >
      {label && (
        <span>{label}</span>
      )}
      {validationError && (
        <span>{validationError.message}</span>
      )}
      <input
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type="number"
        value={value}
      />
    </label>
  );
}
