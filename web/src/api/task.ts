import http from './http';

export const listTasks = () => http.get('/tasks');
export const createTask = (title: string, description?: string) => http.post('/tasks', { title, description });
export const deactivateTask = (id: number) =>
  http.patch(`/tasks/${id}`, { isActive: false });