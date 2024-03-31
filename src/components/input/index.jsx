const Input = ({ type, placeholder, name, state, setState, className }) => {
  // const handleChange = (event) => {
  //   setState(event.target.value);
  // };
  return (
    <input
      value={state}
      type={type}
      name={name}
      className={className}
      placeholder={placeholder}
      onChange={(event) => {
        setState(event.target.value);
      }}
    />
  );
};

export default Input;
