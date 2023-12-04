import React from "react";
import styles from "./style.module.scss"
import clsx from "clsx";
import {isDisabled} from "@testing-library/user-event/dist/utils";

const InputValue = (props) => {
    const {
        value,
        onChange,
        className,
        label,
        disabled
    } = props;

    const inputClass = clsx(
        styles.inputBox,
        className
    )

    return (
        <label >
            {label && <span>{label}</span>}
            <input
                type='text'
                placeholder='Enter'
                value={value}
                onChange={onChange}
                className={inputClass}
                disabled={disabled}
            />
        </label>
    );
}

export default InputValue;