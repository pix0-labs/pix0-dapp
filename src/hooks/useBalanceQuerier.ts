import { useEffect, useCallback, useState } from 'react';
import * as pix0Common from 'pix0-js';
import { WalletConnectionStorage } from 'pix0-react';

const COIN_DENOM = "CONST";

const COIN_MINIMAL_DENOM = "uconst";

const COIN_DECIMALS = 6;


export function useBalanceQuerier(
   coinInfo: {
    coinDenom? : string,

    coinDecimals? : number, 

    displayDecimals? : number, 
})  {

    const [balance, setBalance] = useState(0);

    const [balanceAsStr, setBalanceAsStr] = useState("");

    const [address, setAddress] = useState("");

    const fetchBalance = useCallback(async (denom? : string, coinDecimals?: number  )=>{

        try {
            let w = WalletConnectionStorage.get();
            if (w!== undefined) {
    
                if (w.accounts && w.accounts.length > 0) {
    
                    let addr = w.accounts[0].address;
                    setAddress(addr);
    
                    let b = await pix0Common.getAddressBalance(addr, 
                        denom ?? COIN_MINIMAL_DENOM, coinDecimals ?? COIN_DECIMALS);
                     
                    if (b !== undefined)
                        setBalance(b);

                
                    setBalanceAsStr(`${(b ?? 0).toFixed(coinInfo.displayDecimals ?? 2)} ${COIN_DENOM}`);
                }
                
            }
        }
        catch(e : any){

            console.error("Error@fetchBalance::", e);
        }
       
    },[WalletConnectionStorage.get()]);

    useEffect(()=>{
        fetchBalance(coinInfo.coinDenom,coinInfo.coinDecimals);
    },[fetchBalance]);


    return {balance, address, balanceAsStr, fetchBalance};
}

export default useBalanceQuerier;