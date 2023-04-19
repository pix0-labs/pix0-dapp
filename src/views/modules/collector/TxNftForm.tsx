import { FC, useState, useEffect } from "react";
import { Nft,toUcoin, toCoinStr, Coin, SellOffer} from 'pix0-js';
import useCollectionContract from "pix0-react";
import useTxHash from "../../../hooks/useTxHash";
import { TxHashDiv } from "../../components/TxHashDiv";
import { PulseLoader as Loader} from 'react-spinners';
import { TextField, commonTextfieldClassName } from "../../components/TextField";
import { TokenImageView } from "../../components/TokenImageView";
import '../../css/Img.css';

export type props = {

    token? : Nft,

    tokenId? : string, 
}

export const TxNftForm : FC <props> = ({
    token, tokenId
}) =>{

    const {txHash, setTxHash, setError} = useTxHash();

    const [processing, setProcessing] = useState(false);

    const {transferNft} = useCollectionContract();

    const [recipient, setRecipient] = useState("");


    const txNft = async () => {

        if ( recipient.trim() === "") {

            setError('No recipient!');
            return;
        }

        if ( tokenId === undefined){

            setError('Undefined token id');
            return; 
        }

        setProcessing(true);
        let tx = await transferNft(recipient, tokenId);

        setTxHash(tx);
       
        setProcessing(false);
    }


    return <div className="modal rounded bg-gray-800 w-full text-center text-gray-100 p-2">
    <div className="mb-2 header">Send NFT</div>
    {txHash && <div className="p-2"><TxHashDiv txHash={txHash}/></div>}
    <div className="content">
        <div className="mb-1"><TokenImageView image={token?.extension.image}/></div>
        <div className="mb-6 font-bold text-sm">{token?.extension.name}</div>
        <div className="mb-6"><TextField label={<span className="mr-2 font-bold text-base">Address:</span>} 
        className={commonTextfieldClassName('w-9/12 text-base font-bold min-w-32')}
        type="text" labelInline={true} value={recipient} onChange={(e)=>{
            setRecipient(e.target.value);
        }}/></div>    

         <div className="mb-4"><button 
         disabled={processing}
         className="bg-green-900 p-2 text-base font-bold rounded-3xl text-gray-100"
         style={{minWidth:"120px"}} onClick={async (e)=>{

            await txNft();

         }}>{processing ? <Loader color="#eee" margin={2} size={8}/> 
         : <>Send</>}</button></div>
        
    </div>
    </div>;
}