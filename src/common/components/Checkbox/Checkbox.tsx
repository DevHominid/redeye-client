import styles from './Checkbox.module.css';

type CheckboxProps = {
  label: string;
  name?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: boolean;
};

export default function Checkbox({
  label,
  name,
  onChange,
  value
}: CheckboxProps) {
  return (
    <label className={styles.Checkbox}>
      <span>{label}</span>
      <input checked={value} name={name} onChange={onChange} type="checkbox" />
    </label>
  );
}
