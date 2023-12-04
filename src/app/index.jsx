import React, {useEffect} from "react";
import styles from './styled.module.scss';
import Button from "../components/button/index";
import CurrencySelect from '../components/select/index';
import InputValue from "../components/input/index";
import { MdSwapHoriz } from "react-icons/md";
import {useState} from "react";
import {REQUEST_HEADERS} from "../api/endpoints"
import {API} from "../api/endpoints";
import Result from "../components/result";
import Loader from "../components/loader";
// import CurrencyFlag from "../components/currency-flags";


function App() {
    const [symbolsOption,setSymbolsOptions] = useState([])
    const [fromOption,setFromOption] = useState(null);
    const [toOption,setToOption] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [isDisabled,setIsDisabled] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const [result,setResult] = useState(null)

    const handleConvertCurrency = async () =>{
        if (!inputValue || !toOption || !fromOption){
            return
        }
        try{
            setIsDisabled(true)
            setIsLoading(true)
            const res = await fetch(API.CURRENCY.convert(toOption.value, fromOption.value, inputValue), REQUEST_HEADERS)
            const data = await res.json()

            setResult({
                amount: data.query.amount,
                result: data.result,
                from: data.query.from,
                to: data.query.to
            });
        }catch(error){
            console.log("Error",error);
        }finally {
            setIsDisabled(false)
            setIsLoading(false)
        }
    }
    console.log(inputValue)

    const getSymbols =async ()=>{
        const res = await fetch(API.CURRENCY.symbols, REQUEST_HEADERS)
        const data = await res.json()
        return data.symbols
    }
    const transformSymbolDataToOptions =(symbolsObj) => {
        return Object.keys(symbolsObj).map(item =>{
            return{
                value:item,
                label:item
            }
        })
    }
    function handleSwitchSelects () {
        setFromOption(toOption);
        setToOption(fromOption)
    }
    // useEffect(() =>{
    //     (async ()=>{
    //         const symbols = await getSymbols();
    //         const options = transformSymbolDataToOptions(symbols)
    //         setSymbolsOptions(options);
    //     })()
    //},[])
    return (
        <div className={styles['currency-converter-wrap']}>
            <h1>Currency Converter</h1>
            <InputValue
                label="Enter Amount"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <div className={styles['inputBox']}>
            <CurrencySelect
                label = 'From'
                value={fromOption}
                onChange={val => setFromOption(val)}
                options={symbolsOption}
            />
                <MdSwapHoriz onClick={handleSwitchSelects} className={styles['icon']}/>
            <CurrencySelect
                label = 'To'
                value={toOption}
                onChange={val => setToOption(val)}
                options={symbolsOption}
            />
            </div>
            <Result
            />

            {result && `${result.amount} ${result.from} = ${Math.round(result.result)} ${result.to}`}
            <Button
                onClick = {handleConvertCurrency}
                className={styles['convert-btn']}
                disabled = {!inputValue || !toOption || !fromOption || isDisabled}
            >
                {isLoading ? <span>Please wait...</span>: <span>Get Exchange Rate</span>}
            </Button>


        </div>
    );
}
export default App;