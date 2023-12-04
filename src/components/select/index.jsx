import React from "react";
import Select from 'react-select'
import styles from "./style.module.scss"
import clsx from "clsx";
import CurrencyFlag from "../currency-flags";

const CurrencySelect = (props) => {
    const {
        value,
        onChange,
        options,
        label,
        className
    } = props

    const selectClassnames = clsx(
        styles['select-wrap'],
        className
    )
    const  formatOptionLabel= (option)=> {
        return(
            <div  className={styles['custom-option']}>
                <CurrencyFlag  width = {20} height = {13} currency = {option.value}/>
                <div className={styles['label']}>{option.label}</div>

            </div>
        )
    }
    return (
        <div className={selectClassnames}>
            {label &&
                (<span className={styles['label']}>
                  {label}
                </span>
                )}
            <Select
                classNamePrefix='custom-select'
                value={value}
                onChange={onChange}
                options={options}
                formatOptionLabel={formatOptionLabel}
            />
        </div>
    );
}
export default CurrencySelect;