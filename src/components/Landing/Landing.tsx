import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Landing.module.css';

function Landing() {
  return (
    <div className={styles.Landing}>
      <div className={styles.background} />
      <Link className={styles.loginLink} to="/login">Log in</Link>
      <section>
        <div className={styles.headerWrapper}>
          <h1>RedEye</h1>
        </div>
        <div className={styles.signUpWrapper}>
          <h2>Dead simple service generator</h2>
          <p>
            For when you need APIs on the fly, and would rather fall asleep and wake
            up at your destination
          </p>
          <form>
            <input type="email" placeholder="eterrestrial@example.com" />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </section>
      <section>
        <ul className={styles.featureList}>
          <li className={styles.featureListItem}>
            <FontAwesomeIcon icon={['fas', 'toolbox']} />
            <h3>API Toolkit</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis viverra dictum
              neque, quis consequat lectus vestibulum in.
            </p>
          </li>
          <li className={styles.featureListItem}>
            <FontAwesomeIcon icon={['fas', 'database']} />
            <h3>Flexible Data</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis viverra dictum
              neque, quis consequat lectus vestibulum in.
            </p>
          </li>
          <li className={styles.featureListItem}>
            <FontAwesomeIcon icon={['fas', 'lock']} />
            <h3>Access Control</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis viverra dictum
              neque, quis consequat lectus vestibulum in.
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Landing;
