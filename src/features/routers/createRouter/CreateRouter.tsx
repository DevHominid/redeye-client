import { useEffect, useState } from 'react';
import {
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch
} from 'react-router-dom';
import clone from 'just-clone';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import ValidationError from '../../../errors/ValidationError';
import useTextInput from '../../../hooks/textInput';
import {
  selectActiveService,
  selectServices,
  setActiveService,
  setServices
} from '../../../slices/services';
import { updateExistingServiceInStorage } from '../../../common/StorageUtils';
import { validateBasePath } from '../utils';
import { createNewRouter } from './utils';
import { TextInput } from '../../../common/components';
import Button from '../../../common/components/button';
import CreateRoute from '../createRoute';
import LoadingIndicator from '../../../components/LoadingIndicator';
import type { Route as RouteType } from '../../../common/types';
import globalStyles from '../../../common/global.module.css';
import styles from './CreateRouter.module.css';

function CreateRouter() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const activeService = useAppSelector(selectActiveService);
  const services = useAppSelector(selectServices);
  const { serviceId } = useParams<{serviceId?: string}>();
  const { path } = useRouteMatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingIndicatorActive, setIsLoadingIndicatorActive] = useState(false);
  const [routes, setRoutes] = useState<RouteType[]>([]);
  const {
    onChange: onBasePathChange,
    reset: resetBasePath,
    setValidationError: setBasePathValidationError,
    validationError: basePathValidationError,
    value: basePath
  } = useTextInput('', (value) => validateBasePath(value, activeService));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!activeService || basePathValidationError) {
      return;
    }

    setIsLoading(true);
    setIsLoadingIndicatorActive(true);
    
    try {
      const updatedService = clone(activeService);
      const newRouter = createNewRouter(basePath);
      updatedService.routers.push(newRouter);
      const updatedServices = updateExistingServiceInStorage(updatedService, services);
      resetBasePath();
      dispatch(setServices(updatedServices));
      dispatch(setActiveService(updatedService));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  return (
    <div className={styles.CreateRouter}>
      <Switch>
        <Route exact path={path}>
          <>
            <form className={globalStyles.resourceForm} onSubmit={handleSubmit}>
              <header className={globalStyles.heading}>Create Router</header>
              <section>
                <TextInput
                  id="basePath"
                  label="Base Path"
                  onChange={onBasePathChange}
                  placeholder="/api"
                  required
                  validationError={basePathValidationError}
                  value={basePath}
                />
              </section>
              <section>
                <h2>Routes</h2>
                <div className={globalStyles.selectionTable}>
                  <div>
                    <span>Endpoint</span>
                    <span>Method</span>
                  </div>
                  <ul>
                    {routes.length === 0 && (
                      <li className={globalStyles.emptyTableMessage}>No routes created yet!</li>
                    )}
                  </ul>
                </div>
              </section>
              <div className={globalStyles.buttonWrapper3}>
                <Button
                  disabled={!!basePathValidationError}
                  text="Create Router"
                  type="submit"
                />
                <Button
                  clickHandler={() => {
                    history.push(`${path}/route`)
                  }}
                  text="Create Route"
                />
                <Button
                  clickHandler={() => {
                    history.push(`/services/${serviceId}/routers`)
                  }}
                  color="#0F0905"
                  text="Back"
                />
              </div>
            </form>
            {isLoadingIndicatorActive && (
              <div className={globalStyles.loadingOverlay}>
                <LoadingIndicator
                  isLoading={isLoading}
                  isLoadingIndicatorActiveHandler={setIsLoadingIndicatorActive}
                  message={'Creating Router'}
                />
              </div>
            )}
          </>
        </Route>
        <Route path={`${path}/route`}>
          <CreateRoute />
        </Route>
      </Switch>
    </div>
  );
}

export default CreateRouter;
