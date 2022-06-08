export default function InputField({ setup, state }) {
  const { label, placeholder, type, required } = setup;
  const [value, setValue] = state;
  return (
    <label className="input-field-block">
      {label}
      <input
        placeholder={placeholder}
        value={value}
        required={required}
        type={type}
        onChange={(event) => setValue(event.target.value)}
      />
    </label>
  );
}
