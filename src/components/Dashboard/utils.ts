export function calculateRoutes(service: any) {
  let numberOfRoutes = 0;
  service.routers.forEach((router: any) => numberOfRoutes += router.routes.length);

  return numberOfRoutes;
}
