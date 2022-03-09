import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import clone from 'just-clone';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import ValidationError from '../../../errors/ValidationError';
import useNumberInput from '../../../hooks/numberInput';
import useTextInput from '../../../hooks/textInput';
import { selectActiveService, selectServices, setServices } from '../../../slices/services';
import { setNewServiceToStorage } from '../../../common/StorageUtils';
import { validatePort, validateServiceName } from '../utils';
import { createNewService } from './utils';
import { NumberInput, TextInput } from '../../../common/components';
import Button from '../../../common/components/button';
import LoadingIndicator from '../../../components/LoadingIndicator';
import globalStyles from '../../../common/global.module.css';
import styles from './CreateService.module.css';

function CreateService() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const activeService = useAppSelector(selectActiveService);
  const services = useAppSelector(selectServices);
  const { serviceId } = useParams<{serviceId?: string}>();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingIndicatorActive, setIsLoadingIndicatorActive] = useState(false);
  const {
    onChange: onPortChange,
    reset: resetPort,
    setValidationError: setPortValidationError,
    validationError: portValidationError,
    value: port
  } = useNumberInput(undefined, validatePort);
  const {
    onChange: onServiceNameChange,
    reset: resetServiceName,
    setValidationError: setServiceNameValidationError,
    validationError: serviceNameValidationError,
    value: serviceName
  } = useTextInput('', validateServiceName);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!port || !serviceName) {
      throw new Error('port and service name required for creating new service');
    }

    setIsLoading(true);
    setIsLoadingIndicatorActive(true);

    try {
      const newService = createNewService(port, serviceName);
      const updatedServices = setNewServiceToStorage(newService, services);
      resetServiceName();
      resetPort();
      dispatch(setServices(updatedServices));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  return (
    <div className={styles.CreateService}>
      <form className={globalStyles.resourceForm} onSubmit={handleSubmit}>
        <header className={globalStyles.heading}>Create Service</header>
        <section>
          <TextInput
            id="serviceName"
            label="Service Name"
            onChange={onServiceNameChange}
            placeholder="Example Service 1"
            required
            validationError={serviceNameValidationError}
            value={serviceName}
          />
          <NumberInput
            id="port"
            label="Port"
            onChange={onPortChange}
            placeholder="8080"
            required
            validationError={portValidationError}
            value={port}
          />
        </section>
        <div className={globalStyles.buttonWrapper2}>
          <Button
            disabled={!!serviceNameValidationError}
            text="Create Service"
            type="submit"
          />
          <Button
            clickHandler={() => {
              history.push(`/services`)
            }}
            color="#0F0905"
            text="Back"
          />
        </div>
        {isLoadingIndicatorActive && (
          <div className={globalStyles.loadingOverlay}>
            <LoadingIndicator
              isLoading={isLoading}
              isLoadingIndicatorActiveHandler={setIsLoadingIndicatorActive}
              message={'Creating Service'}
            />
          </div>
        )}
      </form>
    </div>
  );
}

export default CreateService;
