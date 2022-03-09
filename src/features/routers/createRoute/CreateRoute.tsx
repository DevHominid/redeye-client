import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Checkbox, Select, TextInput } from '../../../common/components';
import { useBoolInput, useTextInput } from '../../../hooks';
import Button from '../../../common/components/button';
import {
  addParam,
  listParams,
  validateAPIKey,
  validateAuthParamKey,
  validateEndpoint,
  validateParamName,
  validateProxyHost,
  validateRouteAuthToken
} from './utils';
import ValidationError from '../../../errors/ValidationError';
import type { RequestParam } from '../../../common/types';
import globalStyles from '../../../common/global.module.css';
import styles from './CreateRoute.module.css';

function CreateRoute() {
  const history = useHistory();
  const { serviceId } = useParams<{serviceId?: string}>();
  const [activeParam, setActiveParam] = useState<RequestParam | undefined>(undefined);
  const [params, setParams] = useState<RequestParam[]>([]);
  const {
    onChange: onAPIKeyChange,
    reset: resetAPIKey,
    validationError: apiKeyValidationError,
    value: apiKey
  } = useTextInput('', validateAPIKey);
  const {
    onChange: onAuthParamKeyChange,
    reset: resetAuthParamKey,
    setValidationError: setAuthParamKeyValidationError,
    validationError: authParamKeyValidationError,
    value: authParamKey
  } = useTextInput('', (value) => validateAuthParamKey(value));
  const {
    onChange: onAuthParamTypeChange,
    reset: resetAuthParamType,
    value: authParamType
  } = useTextInput('query');
  const {
    onChange: onAuthTypeChange,
    reset: resetAuthType,
    value: authType
  } = useTextInput('');
  const {
    onChange: onEndpointChange,
    reset: resetEndpoint,
    setValidationError: setEndpointValidationError,
    validationError: endpointValidationError,
    value: endpoint
  } = useTextInput('', validateEndpoint);
  const {
    onChange: onIsPublicChange,
    reset: resetIsPublic,
    value: isPublic
  } = useBoolInput(false);
  const {
    onChange: onParamNameChange,
    reset: resetParamName,
    setValidationError: setParamNameValidationError,
    validationError: paramNameValidationError,
    value: paramName,
  } = useTextInput('', (value) => validateParamName(value, params));
  const {
    onChange: onParamTypeChange,
    reset: resetParamType,
    value: paramType
  } = useTextInput('query');
  const {
    onChange: onProxyHostChange,
    reset: resetProxyHost,
    validationError: proxyHostValidationError,
    value: proxyHost
  } = useTextInput('', validateProxyHost);
  const {
    onChange: onRouteAuthTokenChange,
    reset: resetRouteAuthToken,
    setValidationError: setRouteAuthTokenValidationError,
    validationError: routeAuthTokenValidationError,
    value: routeAuthToken
  } = useTextInput('', validateRouteAuthToken);
  const {
    onChange: onRouteMethodChange,
    reset: resetRouteMethod,
    value: routeMethod
  } = useTextInput('get');
  const {
    onChange: onRouteTypeChange,
    reset: resetRouteType,
    value: routeType
  } = useTextInput('reverseProxy');

  const apiKeyOptions = [
    { text: 'Please select an API Key...', value: '' },
    { text: 'Example API Key 1', value: 'PROXY_API_KEY' }
  ];
  const authParamTypeOptions = [
    { text: 'Query', value: 'query' },
    { text: 'Bearer Token', value: 'bearer' }
  ];
  const authTypeOptions = [
    { text: 'None', value: '' },
    { text: 'API Key', value: 'apiKey' }
  ];
  const paramTypeOptions = [
    { text: 'Query', value: 'query' },
    { text: 'Route', value: 'route' }
  ];
  const proxyHostOptions = [
    { text: 'Please select a proxy host...', value: '' },
    { text: 'Example Proxy Host', value: 'PROXY_HOST_KEY' }
  ];
  const routeAuthTokenOptions = [
    { text: 'Please select an auth token...', value: '' },
    { text: 'Example Auth Token', value: 'example_token' }
  ];
  const routeMethodOptions = [
    { text: 'GET', value: 'get' }
  ];
  const routeTypeOptions = [
    { text: 'Reverse Proxy', value: 'reverseProxy' }
  ];

  const isCreateRouteDisabled = !endpoint
    || !!endpointValidationError
    || (!isPublic && !routeAuthToken)
    || (routeType === 'reverseProxy' && !proxyHost)
    || (authType === 'apiKey' && !apiKey)
    || (authType === 'apiKey' && authParamType === 'query' && !authParamKey);

  useEffect(() => {
    const paramMatch = params.find(param => param.name === activeParam?.name);

    if (activeParam && !paramMatch) {
      setActiveParam(undefined);
    }
  }, [activeParam, params]);

  useEffect(() => {
    if (isPublic && routeAuthTokenValidationError) {
      setRouteAuthTokenValidationError(undefined);
    }
  }, [isPublic, routeAuthTokenValidationError, setRouteAuthTokenValidationError]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isCreateRouteDisabled) {
      throw new Error('route validation failed');
    }

    // setIsLoading(true);
    // setIsLoadingIndicatorActive(true);

    // try {
    //   const newService = createNewService(port, serviceName);
    //   const updatedServices = setNewServiceToStorage(newService, services);
    //   resetServiceName();
    //   resetPort();
    //   dispatch(setServices(updatedServices));
    //   setIsLoading(false);
    // } catch (error) {
    //   setIsLoading(false);
    //   console.error(error);
    // }
  }

  return (
    <div className={styles.CreateRoute}>
      <form className={globalStyles.resourceForm}>
        <header className={globalStyles.heading}>Create Route</header>
        <section>
          <Select
            label="Route Type"
            onChange={onRouteTypeChange}
            options={routeTypeOptions}
            value={routeType}
          />
          <Select
            label="Route Method"
            onChange={onRouteMethodChange}
            options={routeMethodOptions}
            value={routeMethod}
          />
          <TextInput
            id="endpoint"
            label="Endpoint"
            onChange={onEndpointChange}
            placeholder="/ExampleEndpoint"
            required
            validationError={endpointValidationError}
            value={endpoint}
          />
          <Checkbox label="Public" name="public" onChange={onIsPublicChange} value={isPublic} />
          {!isPublic && (
            <Select
              label="Route Auth Token"
              onChange={onRouteAuthTokenChange}
              options={routeAuthTokenOptions}
              validationError={routeAuthTokenValidationError}
              value={routeAuthToken}
            />
          )}
          <label className={styles.paramsTable}>
            <h3>Params</h3>
            <div className={globalStyles.selectionTable}>
              <div>
                <span>Name</span>
                <span>Type</span>
              </div>
              <ul>{listParams(activeParam, params, setActiveParam, setParams)}</ul>
            </div>
            <div>
              <TextInput
                id="paramName"
                onChange={onParamNameChange}
                placeholder="exampleParamName"
                required
                validationError={paramNameValidationError}
                value={paramName}
              />
              <Select
                onChange={onParamTypeChange}
                options={paramTypeOptions}
                value={paramType}
              />
            </div>
            <Button
              disabled={!!paramNameValidationError || !paramName}
              clickHandler={() => {
                addParam(
                  { name: paramName, type: paramType as RequestParam["type"] },
                  params,
                  setParams
                );
                resetParamName('');
                resetParamType('query');
              }}
              text="Add Param"
            />
          </label>
          <h2>Proxy Request</h2>
          <Select
            label="Host"
            onChange={onProxyHostChange}
            options={proxyHostOptions}
            validationError={proxyHostValidationError}
            value={proxyHost}
          />
          <Select
            label="Auth Type"
            onChange={onAuthTypeChange}
            options={authTypeOptions}
            value={authType}
          />
          {authType === "apiKey" && (
            <>
              <Select
                label="API Key"
                onChange={onAPIKeyChange}
                options={apiKeyOptions}
                validationError={apiKeyValidationError}
                value={apiKey}
              />
              <Select
                label="Param Type"
                onChange={onAuthParamTypeChange}
                options={authParamTypeOptions}
                value={authParamType}
              />
              {authParamType === 'query' && (
                <TextInput
                  id="authParamKey"
                  label="Param Key"
                  onChange={onAuthParamKeyChange}
                  placeholder="apikey"
                  required
                  validationError={authParamKeyValidationError}
                  value={authParamKey}
                />
              )}
            </>
          )}
        </section>
        <div className={globalStyles.buttonWrapper3}>
          <Button
            disabled={isCreateRouteDisabled}
            text="Create Route"
            type="submit"
          />
          <Button
            clickHandler={() => {
              history.push(`/services/${serviceId}/routers/create`)
            }}
            color="#0F0905"
            text="Back"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateRoute;
