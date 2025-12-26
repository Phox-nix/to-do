import axios from 'axios';
import { Todo } from '../types/todo';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(API_URL);
  return response.data.slice(0, 5);
};
