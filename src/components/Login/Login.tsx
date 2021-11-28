import { Link } from 'react-router-dom';
import Button from '../Button';
import ufoIcon from '../../assets/img/ufo-landed-icon.svg'; 
import styles from './Login.module.css';

function Login() {
  return (
    <div className={styles.Login}>
      <div className={styles.headerWrapper}>
        <h1>RedEye</h1>
        <img
          alt="ufo"
          className={styles.ufo}
          src={ufoIcon}
        />
      </div>
      <div className={styles.loginWrapper}>
        <div className={styles.clipPath1} />
        <div className={styles.clipPath2} />
        <form>
            <input placeholder="Email" />
            <input placeholder="Password" />
            <Button
              clickHandler={() => console.log('clicked login')}
              text="Log in"
            />
            <Link to="/sign-up">Sign Up</Link>
            <Link to="/">Back</Link>
          </form>
      </div>
    </div>
  );
}

export default Login;
