import { FC } from "react";
import {SellOffer, toCoinStr} from 'pix0-js';
import { TokenImageView } from "../../components/TokenImageView";
import { useNftLoader } from "../../../hooks/useNftLoader";
import { SmUserView } from "../../components/SmUserView";
import '../../css/c.css';

type props = {

    sell_offer : SellOffer, 

    index? : number, 

    toSellOfferDetails? : (offer : SellOffer) => void,

}

export const SOView : FC <props> = ({
    sell_offer, index, toSellOfferDetails,
}) =>{

    const {token} = useNftLoader(sell_offer.token_id);

    return <div className="cursor-pointer bg-gray-700 hover:bg-stone-900 rounded-md 
    text-center py-2 mt-8 ml-4 mr-4 shadow-3xl min-h-200 IndDiv"
    onClick={()=>{
        if ( toSellOfferDetails) {
            toSellOfferDetails(sell_offer);
        }
    }}>
        <div className="pl-4 mt-2 mb-1 truncate font-bold bg-gray-800 p-2 text-center text-sm">
        {`${(index ?? 0) + 1}.`} {token?.extension.name}
        </div>
        <div className="mb-1 p-2 text-center">
            <TokenImageView image={token?.extension.image} style={{width:"160px", height:"160px"}}
            nonClickableForLargerImage={true}/>
        </div>
        <div className="pl-4 mt-2 mb-1 truncate font-bold p-1 align-top text-center text-sm">
            <div className="inline-block mr-2">Price:</div>{toCoinStr(parseInt(sell_offer.price.amount), 2)} CONST      
        </div>
        
        <div className="pl-4 mt-2 mb-1 truncate font-bold p-1 align-top text-center text-sm">
            <div className="mb-1 text-xs">By:</div><SmUserView address={sell_offer.owner}/>      
        </div>

    </div>
}