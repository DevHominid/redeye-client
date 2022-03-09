import type ValidationError from '../../../errors/ValidationError';
import globalStyles from '../../../common/global.module.css';
import styles from './TextInput.module.css';

type TextInputProps = {
  id: string;
  label?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  validationError?: ValidationError;
  value: string;
};

export default function TextInput({
  id,
  label,
  onChange,
  placeholder,
  required,
  validationError,
  value
}: TextInputProps) {
  return (
    <label
      className={`${styles.TextInput} ${validationError ? globalStyles.validationError : ''}`}
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
        type="text"
        value={value}
      />
    </label>
  );
}
