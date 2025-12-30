import styles from './ToDoInput.module.scss';
interface TodoInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  editing: boolean;
}
export default function TodoInput({ input, setInput, onSubmit, editing }: TodoInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a task..."
      />
      <button className={styles.button} onClick={onSubmit}>
        Add item
      </button>
    </div>
  );
}
