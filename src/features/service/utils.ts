import ValidationError from "../../errors/ValidationError";

export function calculateRoutes(service: any) {
  let numberOfRoutes = 0;
  service.routers.forEach((router: any) => numberOfRoutes += router.routes.length);

  return numberOfRoutes;
}

export function validateServiceName(serviceName: string) {
  let validationErrorMessage;
  
  if (!serviceName) {
    validationErrorMessage = 'Service name is required!'
  }

  if (validationErrorMessage) {
    throw new ValidationError('serviceName', validationErrorMessage);
  } else {
    return true;
  }
}

export function validatePort(port: number) {
  let validationErrorMessage;
  
  if (!port) {
    validationErrorMessage = 'Port is required!'
  }

  if (validationErrorMessage) {
    throw new ValidationError('port', validationErrorMessage);
  } else {
    return true;
  }
}
