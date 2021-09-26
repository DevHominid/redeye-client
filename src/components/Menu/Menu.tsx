import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectActiveService, selectServices } from '../../slices/services';
import { listServices } from './utils';
import styles from './Menu.module.css';

function Menu() {
  const dispatch = useAppDispatch();
  const activeService = useAppSelector(selectActiveService);
  const services = useAppSelector(selectServices);

  return (
    <div className={styles.Menu}>
      <h1>Services</h1>
      <ul>{listServices(activeService, services, dispatch)}</ul>
    </div>
  );
}

export default Menu;
