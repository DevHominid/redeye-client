import { listOptions } from './utils';
import type ValidationError from '../../../errors/ValidationError';
import globalStyles from '../../../common/global.module.css';
import styles from './Select.module.css';

export interface SelectOption {
  text: string;
  value: string;
}

type SelectProps = {
  label?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: SelectOption[];
  validationError?: ValidationError;
  value: string;
};

export default function Select({
  label,
  onChange,
  options,
  validationError,
  value
}: SelectProps) {
  return (
    <label className={`${styles.Select} ${validationError ? globalStyles.validationError : ''}`}>
      {label && (
        <span>{label}</span>
      )}
      {validationError && (
        <span>{validationError.message}</span>
      )}
      <select onChange={onChange} value={value}>
        {listOptions(options)}
      </select>
    </label>
  );
}
