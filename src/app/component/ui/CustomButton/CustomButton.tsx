import React from "react";
import { Button } from "react-bootstrap";

type VariantType =
    | "primary"
    | "success"
    | "danger"
    | "dark"
    | "light"
    | "theme"
    | "silver"
    | "transparent";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: any;
    icon?: React.ElementType;
    variant?: VariantType;
    className?: string;
    style?: React.CSSProperties;
}

const variantMap: Record<VariantType, string> = {
    primary: "var(--primaryButton)",
    success: "var(--successButton)",
    danger: "var(--dangerButton)",
    dark: "var(--darkButton)",
    light: "var(--lightButton)",
    theme: "var(--primaryBTN)",
    silver: "var(--silverButton)",
    transparent: "var(--transparentButton)"
};

const CustomButton: React.FC<CustomButtonProps> = ({
    text,
    type,
    icon: Icon,
    variant = "primary",
    className = "",
    onClick,
    style = {},
    ...rest
}) => {
    const backgroundColor = variantMap[variant] || variantMap.primary;
    const showTextOnlyOnDesktop = !!Icon;

    return (
        <Button
            className={`btn d-flex align-items-center justify-content-center rounded-1 buttonHover ${className}`}
            style={{
                backgroundColor,
                color: "white",
                fontSize: "11px",
                border: "none",
                ...style,
            }}
            type={type}
            onClick={onClick}
            {...rest}
        >
            {Icon && <Icon style={{ fontSize: "13px" }} />}
            {text && (
                <span
                    className={`mx-2 ${variant === "transparent" ? "text-dark text-sm" : "text-white"
                        } ${showTextOnlyOnDesktop ? "d-none d-md-inline" : ""}`}
                >
                    {text}
                </span>
            )}
        </Button>
    );
};

export default CustomButton;
