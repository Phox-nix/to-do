import { Todo } from '../types/todo';
import ToDoItem from './ToDoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete, onUpdate }: TodoListProps) {
  return (
    <ul style={{ padding: 0, marginTop: 20 }}>
      {todos.map((todo) => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
