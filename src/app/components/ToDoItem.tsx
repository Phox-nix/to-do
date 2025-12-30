import { useState } from 'react';
import { Todo } from '../types/todo';
import styles from './ToDoItem.module.scss';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this todo?');
    if (confirmed) {
      onDelete(todo.id);
    }
  };

  const handleSave = () => {
    onUpdate(todo.id, editText);
    setIsEditing(false);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    }

    if (e.key === 'Escape') {
      setEditText(todo.title);
      setIsEditing(false);
    }
  };
  return (
    <li className={styles.todoItem}>
      {!isEditing && (
        <label className={styles.checkbox}>
          <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />
          <span className={styles.checkmark} />
        </label>
      )}

      {isEditing ? (
        <input
          className={styles.input}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span className={`${styles.text} ${todo.completed ? styles.completed : ''}`}>
          {todo.title}
        </span>
      )}

      <div className={styles.actions}>
        <button
          className={styles.button}
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
          {isEditing ? '✔️' : '✏️'}
        </button>

        <button className={styles.button} onClick={handleDelete}>
          ✕
        </button>
      </div>
    </li>
  );
}
