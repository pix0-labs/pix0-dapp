import { FC, useState, useEffect } from "react";
import { Nft,toUcoin, toCoinStr, Coin, SellOffer} from 'pix0-js';
import { useMarketContract } from "pix0-react";
import useTxHash from "../../../hooks/useTxHash";
import { TxHashDiv } from "../../components/TxHashDiv";
import { PulseLoader as Loader} from 'react-spinners';
import { TextField, commonTextfieldClassName } from "../../components/TextField";
import { TokenImageView } from "../../components/TokenImageView";
import '../../css/Img.css';

export type props = {

    token? : Nft,

    tokenId? : string, 

    isEditMode? : boolean,

    sell_offer? : SellOffer,

    createOrUpdateCompletion? : () => void, 
}


export const SellOfferForm : FC <props> = ({
    token, tokenId, isEditMode, sell_offer, createOrUpdateCompletion
}) =>{

    const [price, setPrice] = useState<number>(1);

    const [allowedDirectBuy, setAllowedDirectBuy] = useState(true);

    const {txHash, setTxHash, setError} = useTxHash();

    const [processing, setProcessing] = useState(false);

    const {createSellOfferFrom, getCreateSellOfferFee, updateSellOffer} = useMarketContract();

    const [adminFee, setAdminFee] = useState<Coin>();

    useEffect(()=>{
        getCreateSellOfferFee()
        .then(c=>{
            setAdminFee(c);
        });

    },[token]);

    useEffect(()=>{
    
      if ( sell_offer && isEditMode){

          setPrice(parseFloat(toCoinStr(parseFloat(sell_offer.price.amount))));
          setAllowedDirectBuy(sell_offer.allowed_direct_buy);
      }

    },[sell_offer,isEditMode]);


    const createSellOffer = async () => {

        if (price === 0) {
            setError( 'Price must be greater than zero!' );
            return; 
        }

        if (tokenId === undefined || token === undefined) {

            setError('Undefined token id or token!');
            return;
        }

        setProcessing(true);
        let tx = await createSellOfferFrom({
            token_id : tokenId, price : {
                amount : `${toUcoin(price)}`,
                denom : "uconst",
            }, allowed_direct_buy : allowedDirectBuy, nft : token
        });


        setTxHash(tx);
       
        setProcessing(false);
    }


    const createOrUpdateSo = async () =>{

        if ( isEditMode){
            await updateSellOfferNow();
        }
        else {
            await createSellOffer();
        }

        if ( createOrUpdateCompletion)
            createOrUpdateCompletion();

    }

    const updateSellOfferNow = async () => {

        if (price === 0) {
            setError( 'Price must be greater than zero!' );
            return; 
        }

  
        if (sell_offer !== undefined) {

            sell_offer.price = { amount : `${toUcoin(price)}`, denom : sell_offer.price.denom};
            sell_offer.allowed_direct_buy = allowedDirectBuy;

            setProcessing(true);
            let tx = await updateSellOffer(sell_offer);
    
            setTxHash(tx);
           
            setProcessing(false);   

        }
        else {

            setError('Undefined sell offer');
        }

    }

    return <div className="modal rounded bg-gray-800 w-full text-center text-gray-100 p-2">
    <div className="mb-2 header">{isEditMode ? <>Update Sell Offer</> : <>Create Sell Offer For</>}</div>
    {txHash && <div className="p-2"><TxHashDiv txHash={txHash}/></div>}
    <div className="content">
        <div className="mb-1"><TokenImageView image={token?.extension.image}/></div>
        <div className="mb-6 font-bold text-sm">{token?.extension.name}</div>
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

            await createOrUpdateSo();

         }}>{processing ? <Loader color="#eee" margin={2} size={8}/> : <>{isEditMode ? "Update" : "Create"}</>}</button></div>

        { !isEditMode && <div className="text-xs border-t-8 border-b-8 border-double border-gray-500 w-64 mx-auto">
        + Admin Fee :<span className="ml-2 font-bold">≈{toCoinStr(parseInt(adminFee?.amount ?? "0"), 5)} CONST   
        </span></div>}
    
        
    </div>
    </div>;
}