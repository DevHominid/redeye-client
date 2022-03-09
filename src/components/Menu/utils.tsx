import { setActiveService } from '../../slices/services';
import styles from './Menu.module.css';
import type { RouteComponentProps } from 'react-router-dom';

function handleServiceClick(
  dispatch: any,
  history: RouteComponentProps['history'],
  service: any,
  url: string
) {
  dispatch(setActiveService(service));
  history.push(`${url}/${service.id}`);
}

export function listServices(
  activeService: any,
  dispatch: any,
  history: RouteComponentProps['history'],
  services: any[],
  url: string
) {
  return services.map(service => (
    <li
      className={styles.listItem}
      key={service.id}
      style={{ background: activeService?.id === service.id ? '#FA7E61' : 'none' }}
    >
      <button
        onClick={() => handleServiceClick(dispatch, history, service, url)}
      >
        {service.name}
      </button>
    </li>
  ));
}
