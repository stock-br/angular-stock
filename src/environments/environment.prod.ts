export const environment = {
  production: true,
  // baseUrl: 'http://10.147.20.49:5000/api'
  baseUrl: process.env['BASE_URL']
    ? process.env['BASE_URL']
    : 'http://localhost:5000/api',
};
