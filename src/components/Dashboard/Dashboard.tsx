import { useState } from 'react';
import {
  Route,
  Switch,
  useHistory,
  useRouteMatch
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../common/components/button';
import CreateService from '../../features/service/createService';
import Menu from '../Menu';
import Service from '../../features/service';
import { ReactComponent as UFOIcon } from '../../assets/img/ufo.svg';
import styles from './Dashboard.module.css';

function Dashboard() {
  const [menuActive, toggleMenuActive] = useState(false);
  const history = useHistory();
  const { path } = useRouteMatch();

  return (
    <div className={styles.Dashboard}>
      <Menu menuActive={menuActive} toggleMenuActive={toggleMenuActive} />
      <div className={styles.container}>
        <button className={styles.menuToggle} onClick={() => toggleMenuActive(!menuActive)}>
          <FontAwesomeIcon icon={['fas', 'bars']} />
        </button>
        <Switch>
          <Route exact path={path}>
            <div className={styles.noServiceSelected}>
              <UFOIcon />
              <h1>Select a Service or Create a New One to Begin…</h1>
              <Button
                clickHandler={() => {
                  history.push('/services/create')
                }}
                text="Create Service"
              />
            </div>
          </Route>
          <Route path={`${path}/create`}>
            <CreateService />
          </Route>
          <Route path={`${path}/:serviceId`}>
            <Service />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Dashboard;
