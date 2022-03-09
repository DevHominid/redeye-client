import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ValidationError from "../../../errors/ValidationError";
import type { RequestParam } from "../../../common/types";
import globalStyles from '../../../common/global.module.css';
import styles from './CreateRoute.module.css';
import React from "react";

export function addParam(
  param: RequestParam,
  params: RequestParam[],
  setParams: React.Dispatch<React.SetStateAction<RequestParam[]>>
) {
  const paramsClone = [...params];
  paramsClone.push(param);
  paramsClone.sort((a, b) => a.name.localeCompare(b.name));
  setParams(paramsClone);
}

export function deleteParam(
  param: RequestParam,
  params: RequestParam[],
  setParams: React.Dispatch<React.SetStateAction<RequestParam[]>>
) {
  let paramsClone = [...params];
  paramsClone = paramsClone.filter((paramClone) => paramClone.name !== param.name);
  setParams(paramsClone);
}

export function listParams(
  activeParam: RequestParam | undefined,
  params: RequestParam[],
  setActiveParam: React.Dispatch<React.SetStateAction<RequestParam | undefined>>,
  setParams: React.Dispatch<React.SetStateAction<RequestParam[]>>
) {
  return params.map((param) => (
    <li className={`${styles.param} ${activeParam?.name === param.name ? globalStyles.active : ''}`}>
      <button
        onClick={() => setActiveParam(activeParam?.name !== param.name ? param : undefined)}
        type="button"
      >
        <div>{param.name}</div>
        <div>{param.type}</div>
      </button>
      <button
        disabled={activeParam?.name !== param.name}
        onClick={() => deleteParam(param, params, setParams)}
        type="button"
      >
        <FontAwesomeIcon icon={['fas', 'trash-alt']} />
      </button>
    </li>
  ));
}

export function validateEndpoint(basePath: string) {
  let validationErrorMessage;
  
  if (basePath.charAt(0) !== '/') {
    validationErrorMessage = 'Endpoint must begin with backslash ("/") as first character!';
  }
  if (!basePath) {
    validationErrorMessage = 'Endpoint is required!';
  }
  if (basePath === '/') {
    validationErrorMessage = 'At least one character must come after backslash ("/")!';
  }

  if (validationErrorMessage) {
    throw new ValidationError('endpoint', validationErrorMessage);
  } else {
    return true;
  }
}

export function validateAPIKey(apiKey: string) {
  let validationErrorMessage;

  if (!apiKey) {
    validationErrorMessage = 'API key is required!';
  }

  if (validationErrorMessage) {
    throw new ValidationError('apiKey', validationErrorMessage);
  } else {
    return true;
  }
}

export function validateAuthParamKey(authParamKey: string) {
  let validationErrorMessage;
  
  if (!authParamKey) {
    validationErrorMessage = 'Auth param key is required!';
  }

  if (validationErrorMessage) {
    throw new ValidationError('authParamKey', validationErrorMessage);
  } else {
    return true;
  }
}

export function validateParamName(paramName: string, params: RequestParam[]) {
  let validationErrorMessage;

  if (params.find((param) => param.name === paramName)) {
    validationErrorMessage = 'This param name already exists on this route!';
  }

  if (validationErrorMessage) {
    throw new ValidationError('paramName', validationErrorMessage);
  } else {
    return true;
  }
}

export function validateProxyHost(routeAuthToken: string) {
  let validationErrorMessage;

  if (!routeAuthToken) {
    validationErrorMessage = 'Proxy host is required!';
  }

  if (validationErrorMessage) {
    throw new ValidationError('proxyHost', validationErrorMessage);
  } else {
    return true;
  }
}

export function validateRouteAuthToken(routeAuthToken: string) {
  let validationErrorMessage;

  if (!routeAuthToken) {
    validationErrorMessage = 'Route Auth Token is required for private routes!';
  }

  if (validationErrorMessage) {
    throw new ValidationError('routeAuthToken', validationErrorMessage);
  } else {
    return true;
  }
}
