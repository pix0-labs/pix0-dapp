import { useEffect, useCallback, useState } from 'react';
import { WalletConnectionStorage, useBalanceQuerier as useBalanceQuerierReact } from 'pix0-react';

export function useBalanceQuerier(
   coinInfo: {
    coinDenom? : string,

    coinDecimals? : number, 

    displayDecimals? : number, 
})  {


    const {fetchBalance} = useBalanceQuerierReact(coinInfo);

    const [balance, setBalance] = useState(0);

    const [balanceAsUcoin, setBalanceAsUcoin] = useState(0);

    const [balanceAsStr, setBalanceAsStr] = useState("");

    const [address, setAddress] = useState("");


    const fetchBalanceNow = useCallback(async (denom? : string, coinDecimals?: number  )=>{

        let binfo = await fetchBalance(denom, coinDecimals);
        if ( binfo ) {
            setAddress(binfo.address);
            setBalanceAsStr(binfo.balanceAsStr);
            setBalance(binfo.balance);
            setBalanceAsUcoin(binfo.balanceAsUcoin);
        }
       
    },[WalletConnectionStorage.get()]);

    useEffect(()=>{
        fetchBalanceNow(coinInfo.coinDenom,coinInfo.coinDecimals);
    },[fetchBalance]);


    return {balance, address, balanceAsStr, fetchBalance, fetchBalanceNow, balanceAsUcoin};
}

export default useBalanceQuerier;