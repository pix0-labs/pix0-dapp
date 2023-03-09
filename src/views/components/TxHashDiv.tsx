import { FC } from "react";
import { CommonMessageDiv } from "./CommonMessageDiv";
import { shortenStringTo } from "pix0-react2-arch-test";

const TX_URL_PREFIX = "https://testnet.mintscan.io/archway-testnet/txs/";

type props = {

    txHash: string|Error,
}


export const TxHashDiv : FC <props> = ({
    txHash
}) =>{

    
    const div = () =>{

        if (txHash instanceof Error){

            return <CommonMessageDiv className="text-left w-4/5 p-2 bg-red-600 text-gray-100 rounded-2xl"
            transitionDuration={0.32}>{txHash.message}</CommonMessageDiv>
        }
        else {
    
            return <CommonMessageDiv className="text-left w-4/5 p-2 bg-cyan-800 text-gray-100 rounded-2xl"
            transitionDuration={0.32}><a target="_blank" 
            href={`${TX_URL_PREFIX}${txHash}`}>{shortenStringTo(txHash,10)}</a>
            </CommonMessageDiv>
        }
    }

    return div();

}
