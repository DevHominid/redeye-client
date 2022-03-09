import styles from './Button.module.css';

type ButtonProps = {
  clickHandler?: () => any;
  color?: string;
  disabled?: boolean;
  text: string;
  type?: 'button' | 'submit' | 'reset';
}

function Button({
  clickHandler,
  color = '#FA7E61',
  disabled,
  text,
  type = 'button'
}: ButtonProps) {
  return (
    <button
      className={styles.Button}
      disabled={disabled}
      onClick={clickHandler}
      style={{ background: color }}
      type={type}
    >
      {text}
    </button>
  );
}

export default Button;
