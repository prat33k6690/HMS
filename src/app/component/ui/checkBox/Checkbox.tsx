import React from 'react';
import './Checkbox.css';

type checkboxPros = {
    label?: any,
    name?: string,
    value?: any,
    onChange?: any,
    onBlur?: any,
    onClick?: any,
    checked?: any,
    disabled?: boolean,
    className?: string
    tabIndex?: number
}

const Checkbox = ({ label, name, value, onChange, onBlur, onClick, checked, disabled, className, tabIndex }: checkboxPros) => {
    return (
        <div className={`${label ? "d-flex" : ""} ${className || ""}`}>
            <label className="checkbox bounce">
                <input type="checkbox" tabIndex={tabIndex} id={label} name={name} value={value} onChange={onChange} onBlur={onBlur} onClick={onClick} checked={checked} disabled={disabled} />
                <svg viewBox="0 0 21 21">
                    <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                </svg>
            </label>
            <label htmlFor={label} className='ms-2 text-sm'>{label}</label>
        </div>
    )
}

export default Checkbox
