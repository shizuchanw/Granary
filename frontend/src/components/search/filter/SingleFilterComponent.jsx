import React, { useState } from "react";
import Select from "react-select";

const SingleFilterComponent = ({ data, setFilter, label }) => {
  const [input, setInput] = useState("");

  const options = data.map((ele) => ({
    value: ele,
    label: ele,
  }));

  return (
    <div>
      <label htmlFor="input">{label}: </label>
      <Select
        isClearable
        options={options}
        value={input}
        onChange={(value) => {
          setInput(value);
          setFilter(value.value);
        }}
      />
    </div>
  );
};

export default SingleFilterComponent;
