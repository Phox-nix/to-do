import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
      }}>
      <span
        onClick={() => onToggle(todo.id)}
        style={{
          cursor: 'pointer',
          textDecoration: todo.completed ? 'line-through' : 'none',
        }}>
        {todo.completed ? '●' : '○'} {todo.title}
      </span>

      <button onClick={() => onEdit(todo)}>✏️</button>
      <button onClick={() => onDelete(todo.id)}>✕</button>
    </li>
  );
}
