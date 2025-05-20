import React from 'react';
import Flatpickr from "react-flatpickr";

interface datepickerProps {
    value?: Date | Date[] | undefined;
    onChange?: any;
    options?: any;
    onBlur?: any;
    tabIndex?: number;
    label?: string;
    className?: string;
    name?: string;
    size?: string;
    required?: boolean;
    disabled?: boolean;
}

const Datepicker: React.FC<datepickerProps> = ({ value, onChange, options, onBlur, tabIndex, label, className, name, size, required, disabled }) => {
    return (
        <div className="textfield">
            <div className="material-textfield">
                <Flatpickr
                    id="datePicker"
                    className={` form-control ${size === "small"
                        ? `form-sm `
                        : `form-normal`
                        }`}
                    value={value}
                    placeholder=''
                    name={name}
                    disabled={disabled}
                    onChange={onChange}
                    options={options}
                    onBlur={onBlur}
                    tabIndex={tabIndex}
                />
                <label
                    className={`input-label ${required ? 'required' : ''}`}
                >
                    {label}
                </label>
            </div>
        </div>
    )
}

export default Datepicker
