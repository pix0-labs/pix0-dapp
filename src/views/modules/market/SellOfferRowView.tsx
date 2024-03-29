import { FC, useCallback, useEffect, useState} from "react";
import { SellOffer, toCoinStr} from 'pix0-js';
import { useNftLoader } from "../../../hooks/useNftLoader";
import { CProps } from "./SellOffersListView";
import { FcNext } from "react-icons/fc";
import { SmUserView } from "../../components/SmUserView";
import { timestampToTimeAgo } from "pix0-react";
import {useMarketContract} from "pix0-react";
import { TokenImageView } from "../../components/TokenImageView";
import '../../css/SmallImg.css';

type props = CProps & {

    offer : SellOffer, 

    index? : number, 
}

export const SellOfferRowView : FC <props> = ({
    offer, index, toSellOfferDetails, forConnectedWallet
}) =>{

    const {image, token, getCollectionName} = useNftLoader(offer.token_id);

    const priceValue = toCoinStr(parseFloat(offer.price.amount),3, offer.price.denom);

    const [totalBos, setTotalBos] = useState(0);

    const {getBuyOffersBy} = useMarketContract();

    const fetchBuyOffers = useCallback (async () =>{
        try {
            let res = await getBuyOffersBy(offer.offer_id ?? "" );
            setTotalBos( res.total ?? 0);
        }
        catch(e: any){
        }
    }, [offer.offer_id]);

    useEffect(()=>{

        if ( forConnectedWallet){
            fetchBuyOffers();
        }
    },[fetchBuyOffers,forConnectedWallet])


    return <tr className="border-b border-slate-600 hover:bg-gray-700 p-2 cursor-pointer"
    onClick={()=>{
        if (toSellOfferDetails) {
            toSellOfferDetails(offer);
        }
    }}>
        <td className="block sm:table-cell NoCol">{(index ?? 0)+1}</td>
        <td className="block sm:table-cell text-left">
        <TokenImageView image={image} className="sm_img_container"/>
        <div className="font-bold text-sm truncate TokName">{token?.extension.name}</div>
        </td>
        <td title={`${priceValue} CONST`} className="sticky top-0 text-sm" 
        style={{width:"20%"}}>{priceValue}</td>
        {!forConnectedWallet && <td className="sticky top-0" 
        style={{width:"15%"}}><SmUserView address={offer.owner}/></td>}
        {forConnectedWallet ?
        <td className="sticky top-0 text-center text-sm" style={{width:"15%", maxWidth:"80px"}}>{totalBos}</td>
        :<td className="sticky top-0 truncate text-sm" title={getCollectionName()} 
        style={{width:"15%", maxWidth:"80px"}}>{getCollectionName()}</td>
        }
        <td className="sticky top-0 text-sm" style={{width:"10%"}} 
        title={timestampToTimeAgo( offer.date_created ?? 0).asDate}>{timestampToTimeAgo( offer.date_created ?? 0).short}</td>
        <td className="NextArrow sm:table-cell"><FcNext style={{width:"30px",height:"30px"}}/></td>
    </tr>
}