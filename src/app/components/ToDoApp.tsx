'use client';

import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';
import { getTodos } from '../api/todos';
import ToDoInput from './ToDoInput';
import ToDoList from './ToDoList';
import styles from './ToDoApp.module.scss';

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return; //prevent adding empty todos

    setTodos((prev) => [{ id: Date.now(), title: input, completed: false }, ...prev]); //add new todo

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

  const updateTodo = (id: number, newTitle: string) => {
    if (!newTitle.trim()) return;

    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, title: newTitle } : todo)));
  };
  const loadTodos = async () => {
    const storedTodos = localStorage.getItem('todos'); //check local storage for cached todos
    if (storedTodos) {
      //check for cached todos
      setTodos(JSON.parse(storedTodos)); //load cached todos
      return;
    }
    const data = await getTodos(); //fetch todos from api
    setTodos(data); //set fetched todos
    localStorage.setItem('todos', JSON.stringify(data)); //cache fetched todos
  };

  useEffect(() => {
    loadTodos();
  }, []);
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>📝 My To-do List</h2>
      <div className={styles.divider} />

      <ToDoInput
        input={input}
        setInput={setInput}
        onSubmit={addTodo}
        editing={false} //no edit mode in this component
      />

      <ToDoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} onUpdate={updateTodo} />
    </div>
  );
}
