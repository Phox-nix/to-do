interface TodoInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  editing: boolean;
}

export default function TodoInput({ input, setInput, onSubmit, editing }: TodoInputProps) {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add a task..." />
      <button onClick={onSubmit}>{editing ? 'Update' : 'Add'}</button>
    </div>
  );
}
