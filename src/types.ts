enum ContentType {
  'application/json',
  'text/html',
  'image/gif',
  'image/jpeg',
  'image/png',
  'application/xml',
  'text/xml',
}

export type ContentTypes = keyof typeof ContentType;

export interface ContentTypeOverrides {
  [index: string]: ContentTypes[];
  html: ContentTypes[];
  img: ContentTypes[];
  json: ContentTypes[];
  xml: ContentTypes[];
}

export interface CORS {
  domains: string[];
  enabled: boolean;
}

export interface LoginRoute {
  enabled: boolean;
  endpoint: string;
  path: string;
}

enum HttpMethod {
  'delete',
  'get',
  'patch',
  'post'
}

export type HttpMethods = keyof typeof HttpMethod;

enum ProxyAuthMethod {
  'query params'
}

export type ProxyAuthMethods = keyof typeof ProxyAuthMethod;

enum ProxyAuthType {
  'API Key'
}

export type ProxyAuthTypes = keyof typeof ProxyAuthType;

export interface ProxyAuth {
  envKey: string;
  method: ProxyAuthMethods;
  type: ProxyAuthTypes;
  key: string;
}

export interface ProxyRequestParam {
  name: string;
  type: ProxyRequestParamTypes;
}

enum ProxyRequestParamType {
  'route',
  'query',
}

export type ProxyRequestParamTypes = keyof typeof ProxyRequestParamType;

export interface ProxyRequest {
  auth: ProxyAuth;
  contentTypeOverrides: ContentTypeOverrides;
  dataPath: string[];
  envHostName: string;
  headers: ProxyRequestHeader[];
  params: ProxyRequestParam[];
  url: string;
}

export interface ProxyRequestHeader {
  key: string;
  value: string;
}

export interface ProxyRoute extends Route {
  proxyRequest: ProxyRequest;
}

export interface RegisterRoute {
  enabled: boolean;
  endpoint: string;
  path: string;
  public: boolean;
}

export interface ResourceRoute extends Route {
  resourceName: string;
}

export interface Route {
  endpoint: string;
  method: HttpMethods;
  public: boolean;
  type: string;
}

export interface Router {
  basePath: string;
  routes: (ResourceRoute | ProxyRoute)[];
}

export interface Service {
  id: string;
  cors: CORS;
  login: LoginRoute;
  name: string;
  register: RegisterRoute;
  routers: Router[];
}
