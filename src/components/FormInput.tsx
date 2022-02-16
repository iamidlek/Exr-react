import React, { useState } from "react";
import "./formInput.css";

interface Iprops {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: number;
  name: string;
  type: string;
  placeholder: string;
  errorMessage?: string;
  pattern?: string;
  required?: boolean;
  value: string;
}

const FormInput: React.FC<Iprops> = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        className={focused ? "focused" : ""}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
