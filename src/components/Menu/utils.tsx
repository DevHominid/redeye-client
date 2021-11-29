import { setActiveService } from '../../slices/services';
import styles from './Menu.module.css';

export function listServices(activeService: any, services: any[], dispatch: any) {
  return services.map(service => (
    <li
      className={styles.listItem}
      key={service.id}
      style={{ background: activeService?.id === service.id ? '#FA7E61' : 'none' }}
    >
      <button
        onClick={() => dispatch(setActiveService(service))}
      >
        {service.name}
      </button>
    </li>
  ));
}
