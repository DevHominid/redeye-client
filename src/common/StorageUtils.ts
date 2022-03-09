import clone from 'just-clone';
import type { Service } from './types';

export function fetchServicesFromStorage() {
  const services = localStorage.getItem('redeye-services');

  if (services) {
    return JSON.parse(services) as Service[];
  } else {
    return [];
  }
}

export function setNewServiceToStorage(service: Service, services: Service[]) {
  const updatedServices = clone(services);

  updatedServices.push(service);
  localStorage.setItem('redeye-services', JSON.stringify(updatedServices));

  return updatedServices;
}

export function updateExistingServiceInStorage(service: Service, services: Service[]) {
  const updatedServices = clone(services);
  const serviceIndex = updatedServices.findIndex((s) => s.id === service.id);

  if (serviceIndex !== -1) {
    updatedServices[serviceIndex] = service;

    return updatedServices;
  } else {
    throw new Error('service to update does not exist in storage');
  }
}
