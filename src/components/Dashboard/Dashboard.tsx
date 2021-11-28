import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectActiveService } from '../../slices/services';
import { calculateRoutes } from './utils';
import Button from '../Button';
import DashboardLink from './DashboardLink';
import Menu from '../Menu';
import { ReactComponent as UFOIcon } from '../../assets/img/ufo.svg';
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
                  <span>Login:</span>
                  <span className={activeService.login.enabled ? styles.enabledText : styles.disabledText}>
                    {activeService.login.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </li>
                <li>
                  <span>Register:</span>
                  <span className={activeService.register.enabled ? styles.enabledText : styles.disabledText}>
                    {activeService.register.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </li>
              </ul>
            </div>
            <div className={styles.linkWrapper}>
              <DashboardLink href="/routers" icon={['far', 'hdd']} text="Routers" />
              <DashboardLink href="/databases" icon={['fas', 'database']} text="DBs" />
              <DashboardLink href="/security" icon={['fas', 'lock']} text="Security" />
            </div>
            <div className={styles.buttonWrapper}>
              <Button
                clickHandler={() => console.log('clicked')}
                text="Generate Service"
              />
              <Button
                clickHandler={() => console.log('clicked')}
                color="#1F1F1F"
                text="Back"
              />
            </div>
          </div>
        ) : (
          <div className={styles.noServiceSelected}>
            <UFOIcon />
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
