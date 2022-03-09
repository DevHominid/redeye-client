import {
  Route,
  Switch,
  useHistory,
  // useParams,
  useRouteMatch
 } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectActiveService, setActiveService } from '../../slices/services';
import { calculateRoutes } from './utils';
import CreateRouter from '../routers/createRouter';
import Button from '../../common/components/button';
import DashboardLink from '../../components/Dashboard/DashboardLink';
import Routers from '../routers';
import globalStyles from '../../common/global.module.css';
import styles from './Service.module.css';

function Service() {
  const activeService = useAppSelector(selectActiveService);
  const dispatch = useAppDispatch();
  const history = useHistory();
  // const { serviceId } = useParams<{serviceId?: string}>();
  const { path, url } = useRouteMatch();

  return activeService ? (
    <div className={styles.Service}>
      <Switch>
        <Route exact path={path}>
          <>
            <h1 className={globalStyles.heading}>{activeService.name}</h1>
            <div className={styles.details}>
              <ul>
                <li>
                  <span>Last Updated:</span>
                  <span>1/1/2021</span>
                </li>
                <li>
                  <span>Port:</span>
                  <span>{activeService.port}</span>
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
                  <span className={activeService.cors.enabled ? styles.enabledText : styles.disabledText}>
                    {activeService.cors.enabled ? 'Enabled' : 'Disabled'}
                  </span>
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
              <DashboardLink href={`${url}/routers`} icon={['far', 'hdd']} text="Routers" />
              <DashboardLink href={`${url}/databases`} icon={['fas', 'database']} text="DBs" />
              <DashboardLink href={`${url}/security`} icon={['fas', 'lock']} text="Security" />
            </div>
            <div className={globalStyles.buttonWrapper2}>
              <Button
                clickHandler={() => console.log('clicked')}
                text="Generate Service"
              />
              <Button
                clickHandler={() => {
                  dispatch(setActiveService(undefined))
                  history.push(`/services`)
                }}
                color="#1F1F1F"
                text="Back"
              />
            </div>
          </>
        </Route>
        <Route path={`${path}/routers/create`}>
          <CreateRouter />
        </Route>
        <Route path={`${path}/routers`}>
          <Routers />
        </Route>
      </Switch>
    </div>
  ) : (
    null
  );
}

export default Service;
