import { FC, useState, useEffect } from "react";
import { BuyOffer, toCoinStr, Coin, toUcoin} from 'pix0-js';
import { useMarketContract } from "pix0-react";
import { TxHashDiv } from "../../components/TxHashDiv";
import { PulseLoader as Loader} from 'react-spinners';
import { TextField, commonTextfieldClassName } from "../../components/TextField";
import { TokenImageView } from "../../components/TokenImageView";
import '../../css/Img.css';

export type props = {

    sell_offer_id? : string , 
}


export const CreateBuyOfferForm : FC <props> = ({
    sell_offer_id, 
}) =>{

    const [price, setPrice] = useState<number>(1);

    const [allowedDirectBuy, setAllowedDirectBuy] = useState(true);

    const [txHash, setTxHash] = useState<Error|string>();

    const [processing, setProcessing] = useState(false);

    const {createBuyOffer, getCreateBuyOfferFee} = useMarketContract();

    const [adminFee, setAdminFee] = useState<Coin>();

    useEffect(()=>{
        getCreateBuyOfferFee()
        .then(c=>{
            setAdminFee(c);
        });

    },[sell_offer_id]);

    const setTxHashNow = ( tx : Error|string) =>{

        setTxHash(tx);

        if ( tx instanceof Error){
            setTimeout(()=>{
                setTxHash(undefined)
            },6000);
        }
       
    }
    const createBuyOfferNow = async () => {

        if (price === 0) {
            setTxHashNow(new Error('Price must be greater than zero!'));
            return; 
        }

        if (sell_offer_id === undefined ) {

            setTxHashNow(new Error('No sell offer ID!'));
            return;
        }

        setProcessing(true);

        let bo : BuyOffer = {
            owner : "",
            sell_offer_id : sell_offer_id ?? "",
            price : { amount : `${toUcoin(price)}`, denom : "uconst"},
            accepted : false,
        };

        let tx = await createBuyOffer(bo, sell_offer_id ?? "");

        setTxHash(tx);
       
        setProcessing(false);
    }

    
    return <div className="modal rounded bg-gray-800 w-full text-center text-gray-100 p-2">
    <div className="mb-2 header">Create Buy Offer For Sell Offer : <span className="font-bold">{sell_offer_id}</span></div>
    {txHash && <div className="p-2"><TxHashDiv txHash={txHash}/></div>}
    <div className="content">
        <div className="mb-6"><TextField label={<span className="mr-2 font-bold text-base">Price:</span>} 
        className={commonTextfieldClassName('w-2/12 text-base font-bold min-w-32')}
        type="number" labelInline={true} value={`${price}`} onChange={(e)=>{
            let v = parseFloat(e.target.value);
            if (!isNaN(v) && v >= 0 ){
                setPrice(v);
            }
        }}/><span className="ml-1 font-bold">CONST</span></div>    

        <div className="mb-6">
        <span className="font-bold mr-2">Allowed Direct Buy?</span>
        <input type="checkbox" checked={allowedDirectBuy} onChange={(e)=>{
            setAllowedDirectBuy(e.target.checked);}}/>
        </div> 

         <div className="mb-4"><button 
         disabled={processing}
         className="bg-green-900 p-2 text-base font-bold rounded-3xl text-gray-100"
         style={{minWidth:"120px"}} onClick={async (e)=>{

            await createBuyOfferNow();

         }}>{processing ? <Loader color="#eee" margin={2} size={8}/> : <>Create</>}</button></div>

        <div className="text-xs border-t-8 border-b-8 border-double border-gray-500 w-64 mx-auto">
        + Admin Fee :<span className="ml-2 font-bold">≈{toCoinStr(parseInt(adminFee?.amount ?? "0"), 5)} CONST   
        </span></div>
    
        
    </div>
    </div>;
}