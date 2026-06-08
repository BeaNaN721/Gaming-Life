import http from './http';

export const login = (username: string, password: string) =>
  http.post('/auth/login', {username, password});

export const register = (username: string, password: string) =>
  http.post('/auth/register', {username, password});

export const getMe = () => http.get('/user/me');

