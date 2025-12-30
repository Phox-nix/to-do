import axios from 'axios';
import { Todo } from '../types/todo';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(API_URL);
  return response.data.slice(0, 5);
};
