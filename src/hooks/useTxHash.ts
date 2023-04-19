import { useState } from "react";

export default function useTxHash() {

    const [txHash, setTxHash2] = useState<Error|string>();


    const setTxHash = (tx : string| Error ) =>{

        setTxHash2( tx );

        if ( tx instanceof Error) {

            setTimeout(()=>{
                setTxHash2(undefined);
            }, 7000);
        }

    }


    const setError = (err : string|Error ) =>{

        if (err instanceof Error){

            setTxHash(err);
        }
        else {
            setTxHash( new Error(err) );
        }
    }


    return {txHash, setTxHash, setError} as const;
}