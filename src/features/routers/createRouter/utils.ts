import type { Router } from '../../../common/types';

export function createNewRouter(basePath: string): Router {
  const newRouter = {
    basePath,
    routes: []
  };

  return newRouter;
}
