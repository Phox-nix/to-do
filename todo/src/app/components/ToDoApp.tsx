'use client';

import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';
import { fetchTodos } from '../api/todos';
import ToDoInput from './ToDoInput';
import ToDoList from './ToDoList';

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      const data = await fetchTodos();
      setTodos(data);
    };

    loadTodos();
  }, []);

  const addOrEditTodo = () => {
    if (!input.trim()) return;

    if (editingId !== null) {
      setTodos((prev) =>
        prev.map((todo) => (todo.id === editingId ? { ...todo, title: input } : todo)),
      );
      setEditingId(null);
    } else {
      setTodos((prev) => [...prev, { id: Date.now(), title: input, completed: false }]); //date.now() to generate a unique id
    }

    setInput(''); //clears input after adding or editing
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const startEdit = (todo: Todo) => {
    setInput(todo.title);
    setEditingId(todo.id);
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h2>📝 Todo List</h2>

      <ToDoInput
        input={input}
        setInput={setInput}
        onSubmit={addOrEditTodo}
        editing={editingId !== null}
      />

      <ToDoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={startEdit} />
    </div>
  );
}
