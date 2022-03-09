import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ValidationError from '../../errors/ValidationError';
import type { Router } from '../../common/types';
import type { ActiveService } from '../../slices/services';
import globalStyles from '../../common/global.module.css';

export function listRouters(
  activeRouter: Router| undefined,
  routers: Router[],
  setActiveRouter: React.Dispatch<React.SetStateAction<Router | undefined>>
) {
  return routers.map((router: Router) => (
    <li
      className={`${activeRouter?.basePath === router.basePath ? globalStyles.active : ''}`}
      key={router.basePath}
    >
      <button onClick={() => setActiveRouter(activeRouter?.basePath !== router.basePath ? router : undefined)}>
        <div>{router.basePath}</div>
        <div>{router.routes.length}</div>
      </button>
      <button>
        <FontAwesomeIcon icon={['fas', 'trash-alt']} />
      </button>
    </li>
  ));
}

export function validateBasePath(basePath: string, activeService: ActiveService) {
  let validationErrorMessage;
  
  if (basePath.charAt(0) !== '/') {
    validationErrorMessage = 'Base path must begin with backslash ("/") as first character!';
  }
  if (!basePath) {
    validationErrorMessage = 'Base path is required!'
  }
  if (basePath === '/') {
    validationErrorMessage = 'At least one character must come after backslash ("/")!';
  }
  
  const existingBasePath = activeService?.routers.find(router => router.basePath === basePath);
  if (existingBasePath) {
    validationErrorMessage = 'This base path already exists on a router on this service!';
  }

  if (validationErrorMessage) {
    throw new ValidationError('basePath', validationErrorMessage);
  } else {
    return true;
  }
}
