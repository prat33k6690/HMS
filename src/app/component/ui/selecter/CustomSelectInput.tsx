import React from "react";
import Select, {
    SingleValue,
    ActionMeta,
    StylesConfig,
    GroupBase,
} from "react-select";
import { Form } from "react-bootstrap";
import { customSelectStyles } from "./Selectercss/SelecterCss";


interface OptionType {
    label: string;
    value: string | number;
}

interface CustomSelectInputProps {
    name: string;
    value: OptionType | null;
    onChange: (
        newValue: SingleValue<OptionType>,
        actionMeta: ActionMeta<OptionType>
    ) => void;
    onBlur?: () => void;
    label: string;
    options?: OptionType[];
    isDisabled?: boolean;
    placeholder?: string;
    required?: boolean;
    className?: string;
    autoFocus?: boolean;
}

const CustomSelectInput: React.FC<CustomSelectInputProps> = ({
    name,
    value,
    onChange,
    onBlur,
    label,
    options = [],
    isDisabled = false,
    placeholder = "Select",
    required = false,
    className = "",
    autoFocus = false,
}) => {
    return (
        <>
            <Form.Label className=" text-sm mb-0">
                {label} {required && <span className="starcolor">*</span>}
            </Form.Label>
            <Select<OptionType, false>
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                options={options}
                isDisabled={isDisabled}
                placeholder={placeholder}
                autoFocus={autoFocus}
                className={`inputlable InputHieght mt-1 seletersize ${className}`}
                styles={customSelectStyles}
            />
        </>
    );
};

export default CustomSelectInput;
