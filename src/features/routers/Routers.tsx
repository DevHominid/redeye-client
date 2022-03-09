import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '../../app/hooks';
import { selectActiveService } from '../../slices/services';
import { listRouters } from './utils';
import Button from '../../common/components/button';
import globalStyles from '../../common/global.module.css';
import styles from './Routers.module.css';
import type { Router } from '../../common/types';

function Routers() {
  const [activeRouter, setActiveRouter] = useState<Router | undefined>(undefined);
  const activeService = useAppSelector(selectActiveService);
  const history = useHistory();
  const { serviceId } = useParams<{serviceId?: string}>();

  return (
    <div className={styles.Routers}>
      <h1 className={globalStyles.heading}>
        <FontAwesomeIcon icon={['far', 'hdd']} />
        <span>Routers</span>
      </h1>
      <section>
        <div className={globalStyles.selectionTable}>
          <div>
            <span>Base Path</span>
            <span>Routes</span>
          </div>
          <ul>
            {activeService && listRouters(
              activeRouter,
              activeService.routers,
              setActiveRouter
            )}
            {activeService?.routers && activeService.routers.length === 0 && (
              <li className={globalStyles.emptyTableMessage}>No routers created yet!</li>
            )}
          </ul>
        </div>
        <div className={globalStyles.buttonWrapper3}>
          <Button
            clickHandler={() => {
              history.push(`/services/${serviceId}/routers/create`)
            }}
            text="Create Router"
          />
          <Button
            clickHandler={() => console.log('clicked')}
            text="Edit Router"
          />
          <Button
            clickHandler={() => {
              history.push(`/services/${serviceId}`)
            }}
            color="#1F1F1F"
            text="Back"
          />
        </div>
      </section>
    </div>
  );
}

export default Routers;
