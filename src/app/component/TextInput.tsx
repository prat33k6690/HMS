import React, { ChangeEventHandler } from "react";
import "./Textfield.css";
import { Form } from "react-bootstrap";

interface props {
  label?: string;
  type?: string;
  name?: string;
  id?: string;
  required?: boolean;
  IconProp?: any;
  className?: string;
  size?: "sm" | "lg" | undefined;
  placeholder?: string;
  style?: {};
  width?: string;
  value?: any;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: any;
  onKeyDown?: any;
  readOnly?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: any;
  max?: any;
  multiline?: boolean;
  disabled?: boolean;
  tabIndex?: number;
  step?: number;
  onFocus?: any;
  pattern?: any;
  autoFocus?: boolean;
}

const Textfield = ({
  label,
  type,
  name,
  id,
  required,
  IconProp,
  className,
  size,
  placeholder,
  style,
  width,
  value,
  onBlur,
  onChange,
  readOnly,
  maxLength,
  minLength,
  min,
  max,
  onKeyDown,
  multiline,
  disabled,
  tabIndex,
  step,
  onFocus,
  autoFocus,
  pattern
}: props) => {
  return (
    <div className="textfield" style={{ width: width }}>
      <div className="material-textfield mt-1">
        {label && (
          <label
            htmlFor={id}
            className={`text-slate-500 text-xs ${required ? "required" : ""}`}
          >
            {label}
          </label>
        )}

        <Form.Control
          placeholder={placeholder ? placeholder : ""}
          type={type ? type : "text"}
          className={`${IconProp ? "paddingforIcon-sm" : ""} ${className}`}
          style={{ ...style, height: "35px" }}
          size={size}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          required={required}
          readOnly={readOnly}
          tabIndex={tabIndex}
          min={min}
          max={max}
          pattern={pattern}
          autoFocus={autoFocus}
          onKeyDown={onKeyDown}
          maxLength={maxLength}
          minLength={minLength}
          multiple={multiline}
          disabled={disabled}
          autoComplete="off"
          step={step}
        />

        {/* {IconProp && (
          <div className="form-icon">
            <i
              className={`${IconProp} text-slate-700 `}
              style={{ fontSize: 13 }}
              aria-hidden="true"
            ></i>
          </div>
        )} */}

        {IconProp && (
          <div className="form-icon">
            <IconProp className="text-slate-700" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Textfield;
