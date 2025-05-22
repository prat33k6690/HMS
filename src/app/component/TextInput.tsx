import React, { ChangeEventHandler, FocusEventHandler, KeyboardEventHandler } from "react";
import "./Textfield.css";
import { Form } from "react-bootstrap";

interface Props {
  label?: string;
  type?: string;
  name?: string;
  id?: string;
  required?: boolean;
  IconProp?: any;
  className?: string;
  size?: "sm" | "lg";
  placeholder?: string;
  style?: React.CSSProperties;
  width?: string;
  value?: any;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  readOnly?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: any;
  max?: any;
  multiline?: boolean;
  disabled?: boolean;
  tabIndex?: number;
  step?: number;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  pattern?: string;
  autoFocus?: boolean;
  feedback?: string;
  isValid?: boolean;
  isInvalid?: boolean;
}

const Textfield = ({
  label,
  type = "text",
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
  pattern,
  feedback,
  isValid,
  isInvalid,
}: Props) => {
  return (
    <Form.Group className={`textfield ${className || ""}`} style={{ width }} controlId={id}>
      {label && (
        <Form.Label className="text-slate-500 text-xs">
          {label} {required && <span className="text-danger">*</span>}
        </Form.Label>
      )}

      <div className="material-textfield mt-1" style={{ position: "relative" }}>
        <Form.Control
          type={type}
          placeholder={placeholder}
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
          style={{ ...style, height: "35px", paddingLeft: IconProp ? "30px" : undefined }}
          isValid={isValid}
          isInvalid={isInvalid}
        />
        {IconProp && (
          <div className="form-icon" style={{ position: "absolute", top: "50%", left: "8px", transform: "translateY(-50%)" }}>
            <IconProp className="text-slate-700" />
          </div>
        )}
      </div>

      {feedback && (
        <Form.Control.Feedback type={isInvalid ? "invalid" : "valid"}>
          {feedback}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default Textfield;
