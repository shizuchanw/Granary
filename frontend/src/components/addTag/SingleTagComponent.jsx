import React, { useState, useEffect } from "react";
import Select from "react-select";

const SingleTagComponent = ({
  data,
  setTag,
  initialValue,
  label,
  required,
}) => {
  const [input, setInput] = useState(initialValue);
  useEffect(() => {
    const init = {
      value: initialValue,
      label: initialValue,
    };
    setInput(init);
  }, [initialValue]);

  const options = data.map((ele) => ({
    value: ele,
    label: ele,
  }));

  return (
    <div>
      <label htmlFor="input" className={required ? "form-label-required" : ""}>
        {label}
      </label>
      {required && (
        <input
          tabIndex={-1}
          autoComplete="off"
          style={{ opacity: 0, height: 0 }}
          value={input}
          onChange={() => {}}
          required={required}
        />
      )}
      <Select
        isClearable
        options={options}
        value={input}
        onChange={(value) => {
          setInput(value);
          setTag(value.value);
        }}
      />
    </div>
  );
};

export default SingleTagComponent;
