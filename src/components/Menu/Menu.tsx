import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectActiveService, selectServices } from '../../slices/services';
import { listServices } from './utils';
import styles from './Menu.module.css';

type MenuProps = {
  menuActive: boolean;
  toggleMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
};

function Menu({ menuActive, toggleMenuActive }: MenuProps) {
  const dispatch = useAppDispatch();
  const activeService = useAppSelector(selectActiveService);
  const services = useAppSelector(selectServices);

  return (
    <div className={`${styles.Menu} ${menuActive ? styles.active : ''}`}>
      <button className={styles.menuToggle} onClick={() => toggleMenuActive(!menuActive)}>
        <FontAwesomeIcon icon={['fas', 'bars']} />
      </button>
      <h1>Services</h1>
      <div className={styles.listWrapper}>
        <ul>{listServices(activeService, services, dispatch)}</ul>
      </div>
    </div>
  );
}

export default Menu;
