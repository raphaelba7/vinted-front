const Input = ({
  type,
  placeholder,
  name,
  state,
  setState,
  className,
  min,
  max,
  label,
  classNameLabel,
}) => {
  // const handleChange = (event) => {
  //   setState(event.target.value);
  // };

  if (type === "file") {
    return (
      <>
        <label htmlFor={name} className={classNameLabel}>
          {label}
        </label>
        <input
          id={name}
          type={type}
          name={name}
          className={className}
          placeholder={placeholder}
          min={min}
          max={max}
          onChange={(event) => {
            setState(event.target.files[0]);
          }}
        />
      </>
    );
  } else {
    return (
      <input
        value={state}
        type={type}
        name={name}
        className={className}
        placeholder={placeholder}
        min={min}
        max={max}
        onChange={(event) => {
          setState(event.target.value);
        }}
      />
    );
  }
};

export default Input;
