import { useHistory, useRouteMatch } from 'react-router-dom';
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
  const history = useHistory();
  const activeService = useAppSelector(selectActiveService);
  const services = useAppSelector(selectServices);
  const { url } = useRouteMatch();

  return (
    <div className={`${styles.Menu} ${menuActive ? styles.active : ''}`}>
      <button className={styles.menuToggle} onClick={() => toggleMenuActive(!menuActive)}>
        <FontAwesomeIcon icon={['fas', 'bars']} />
      </button>
      <h1>Services</h1>
      <div className={styles.listWrapper}>
        <ul>
          {listServices(
            activeService,
            dispatch,
            history,
            services,
            url
          )}
        </ul>
      </div>
    </div>
  );
}

export default Menu;
