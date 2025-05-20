import React from "react";
import Select from "react-select";
import "./Select.css";

type selectProps = {
  options?: any[];
  label?: string;
  placeholder?: string;
  name?: string;
  onChange?: any;
  isSearchable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  required?: boolean;
  value?: any;
  isMulti?: boolean;
  onBlur?: any;
  tabIndex?: any;
  styles?: any;
};

const SelectField: React.FC<selectProps> = ({
  options,
  label,
  placeholder,
  name,
  onChange,
  isSearchable,
  isDisabled,
  isLoading,
  required,
  value,
  isMulti,
  onBlur,
  tabIndex,
  styles,
}) => {
  return (
    <div className={required ? "select-required" : ""} style={styles}>
      {label && (
        <label className={`input-label text-xs ${required ? "required" : ""}`}>
          {label}
        </label>
      )}

      <Select
        className="select-form"
        name={name}
        placeholder={placeholder}
        styles={styles}
        options={options}
        required={required}
        isSearchable={isSearchable}
        isDisabled={isDisabled}
        isMulti={isMulti}
        isLoading={isLoading}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        tabIndex={tabIndex}
      />
    </div>
  );
};

export default SelectField;
