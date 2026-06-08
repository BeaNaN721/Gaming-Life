import http from './http';

export const checkin = (taskId: number) =>
  http.post('/checkins', { taskId });
export const todayCheckins = () =>
  http.get('/checkins/today');
export const getStreak = () =>
  http.get('/checkins/streak');