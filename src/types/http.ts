export type HttpRequest = {
  query?: any;
  body?: any;
  params?: any
};

export type HttpResponse = {
  body?: any;
  statusCode: number;
};
