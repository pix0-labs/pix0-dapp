import { FC } from "react";
import { CommonMessageDiv } from "./CommonMessageDiv";
import { shortenStringTo } from "pix0-react";

const TX_URL_PREFIX = "https://testnet.mintscan.io/archway-testnet/txs/";

type props = {

    txHash: string|Error,
}


export const TxHashDiv : FC <props> = ({
    txHash
}) =>{

    
    const div = () =>{

        if (txHash instanceof Error){

            return <CommonMessageDiv style={{width:"100%"}}
            className="text-left w-full p-2 bg-red-600 text-gray-100 rounded mb-2"
            transitionDuration={0.32}>{txHash.message}</CommonMessageDiv>
        }
        else {
    
            return <CommonMessageDiv style={{width:"100%"}}
            className="text-left w-full p-2 bg-cyan-800 text-gray-100 rounded mb-2"
            transitionDuration={0.32}>Success! View TX : <a target="_blank" 
            href={`${TX_URL_PREFIX}${txHash}`}>{shortenStringTo(txHash,10)}</a>
            </CommonMessageDiv>
        }
    }

    return div();

}
