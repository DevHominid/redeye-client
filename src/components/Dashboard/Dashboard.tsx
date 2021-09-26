import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectActiveService } from '../../slices/services';
import { calculateRoutes } from './utils';
import Button from '../Button';
import Menu from '../Menu';
import styles from './Dashboard.module.css';

function Dashboard() {
  const activeService = useAppSelector(selectActiveService);

  return (
    <div className={styles.Dashboard}>
      <Menu />
      <div className={styles.container}>
        {activeService ? (
          <div className={styles.serviceWrapper}>
            <h1>{activeService.name}</h1>
            <div className={styles.details}>
              <ul>
                <li>
                  <span>Last Updated:</span>
                  <span>1/1/2021</span>
                </li>
                <li>
                  <span>Routers:</span>
                  <span>{activeService.routers.length}</span>
                </li>
                <li>
                  <span>Routes:</span>
                  <span>{calculateRoutes(activeService)}</span>
                </li>
              </ul>
              <ul>
                <li>
                  <span>CORS:</span>
                  <span>{}</span>
                </li>
                <li>
                  <span>Routers:</span>
                  <span>{activeService.routers.length}</span>
                </li>
                <li>
                  <span>Routes:</span>
                  <span>{calculateRoutes(activeService)}</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className={styles.noServiceSelected}>
            <h1>Select a Service or Create a New One to Begin…</h1>
            <Button
              clickHandler={() => console.log('clicked')}
              text="Create Service"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
