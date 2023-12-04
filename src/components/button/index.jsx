import React from "react";
import styles from "./style.module.scss";
import clsx from "clsx";

const Button = (props) => {
    const {
    children,
    className,
    onClick,
    disabled,
    type = 'button'
    } = props

const mainClasses = clsx(
    styles.button,
    className
)
    return (
        <button onClick={onClick} type = 'type' className={mainClasses}
        disabled={disabled}>

            {children}
        </button>

    )

}
export default Button;