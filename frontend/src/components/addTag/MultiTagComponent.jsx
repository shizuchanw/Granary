import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";

const MultiTagComponent = ({ data, setTag, initialValue, label, required }) => {
  const [input, setInput] = useState(initialValue);
  useEffect(() => {
    const init = initialValue.map((ele) => ({
      value: ele,
      label: ele,
    }));
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
      <CreatableSelect
        isMulti
        isClearable
        options={options}
        value={input}
        onChange={(value) => {
          setInput(value);
          setTag(value.map((ele) => ele.value));
        }}
      />
    </div>
  );
};

export default MultiTagComponent;
