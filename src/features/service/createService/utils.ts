import { v4 as uuidv4 } from 'uuid';
import type { Service } from '../../../common/types';

export function createNewService(port: number, serviceName: string): Service {
  const newService = {
    id: uuidv4(),
    cors: {
      domains: [],
      enabled: false
    },
    login: {
      enabled: false,
      endpoint: '/login',
      basePath: '/auth'
    },
    name: serviceName,
    port,
    register: {
      basePath: '/auth',
      enabled: false,
      endpoint: '/register',
      public: true
    },
    routers: []
  }

  return newService;
}
