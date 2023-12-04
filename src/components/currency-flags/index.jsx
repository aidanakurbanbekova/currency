import React from "react";
import styles from "./style.module.scss"
import flags  from "../../consts/flags";
import styled from "styled-components";
const CurrencyFlag=(props)=>{
    const {
        currency,
        width,
        height
    }= props
    const StyledImgWrap = styled.div`
    width: ${props => props.$width || 16}px;
      height: ${props => props.$height || 16}px;
`

    return(
        <StyledImgWrap $width={width} height={height} className={styles['currency-flag']} >
           <img src={flags[currency.toLowerCase()]} alt='Currency Flag'/>
        </StyledImgWrap>
    )
}
export default CurrencyFlag;