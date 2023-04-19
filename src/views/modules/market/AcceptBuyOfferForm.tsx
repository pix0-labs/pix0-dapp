import { FC, useState} from "react";
import { BuyOffer, toCoinStr, Coin, toUcoin} from 'pix0-js';
import { useMarketContract } from "pix0-react";
import { TxHashDiv } from "../../components/TxHashDiv";
import useTxHash from "../../../hooks/useTxHash";
import { PulseLoader as Loader} from 'react-spinners';
import { SmUserView } from "../../components/SmUserView";
import '../../css/Img.css';

export type props = {

    buy_offer : BuyOffer , 
}


export const AcceptBuyOfferForm : FC <props> = ({
    buy_offer
}) =>{

    const {txHash, setTxHash} = useTxHash();

    const [processing, setProcessing] = useState(false);

    const {acceptBuyOffer} = useMarketContract();

    const acceptBuyOfferNow = async () => {

        setProcessing(true);

        let tx = await acceptBuyOffer(buy_offer.sell_offer_id, buy_offer.owner, 450_000);

        setTxHash(tx);
       
        setProcessing(false);
    }

    
    return <div className="modal rounded bg-gray-800 w-full text-center text-gray-100 p-2">
    <div className="mb-2 header">Accept This Buy Offer ?</div>
    {txHash && <div className="p-2"><TxHashDiv txHash={txHash}/></div>}
    <div className="content text-lg">
        <div className="mb-4">By: <SmUserView address={buy_offer.owner}/> </div>
        <div className="mb-4">Price: <span className="font-bold">{toCoinStr(parseInt(buy_offer.price.amount))} CONST</span></div>
        <div className="mb-4"><button 
         disabled={processing}
         className="bg-green-900 p-2 text-base font-bold rounded-3xl text-gray-100"
         style={{minWidth:"120px"}} onClick={async (e)=>{

            await acceptBuyOfferNow();

         }}>{processing ? <Loader color="#eee" margin={2} size={8}/> : <>Accept</>}</button></div>

    
    </div></div>;
}