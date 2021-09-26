import React from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  clickHandler: () => any;
  color?: string;
  disabled?: boolean;
  text: string;
}

function Button({
  clickHandler,
  color = '#FA7E61',
  disabled,
  text
}: ButtonProps) {
  return (
    <button
      className={styles.Button}
      disabled={disabled}
      onClick={() => clickHandler()}
      style={{ background: color }}
    >
      {text}
    </button>
  );
}

export default Button;
