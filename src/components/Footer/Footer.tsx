import devHominidLogo from '../../assets/img/devhominid-logo.svg';
import styles from './Footer.module.css';

function Footer() {
  return (
    <div className={styles.Footer}>
      <span className={styles.copyright}>&copy; 2021 DevHominid </span>
      <img alt="devhominid" src={devHominidLogo} />
    </div>
  );
}

export default Footer;
