import { FC} from "react";
import { BuyOffer, toCoinStr} from 'pix0-js';
import { CProps } from "./BuyOffersListView";
import { FcNext } from "react-icons/fc";
import { shortenStringTo, timestampToTimeAgo } from "pix0-react";
import '../../css/SmallImg.css';

type props = CProps & {

    offer : BuyOffer, 

    index? : number, 
}

export const BuyOfferRowView : FC <props> = ({
    offer, index, toBuyOfferDetails 
}) =>{


    return <tr className="border-b border-slate-600 hover:bg-gray-700 p-2 cursor-pointer"
    onClick={()=>{
        if (toBuyOfferDetails) {
            toBuyOfferDetails(offer);
        }
    }}>
        <td className="block sm:table-cell">{(index ?? 0)+1}</td>
        <td title={`${offer.price.amount}${offer.price.denom}`} className="sticky top-0"   
        style={{width:"20%"}}>{toCoinStr(parseFloat(offer.price.amount),3, offer.price.denom)} CONST</td>
        <td className="sticky top-0" style={{width:"30%"}}>{shortenStringTo(offer.owner, 10)}</td>
        <td className="sticky top-0" style={{width:"10%"}} 
        title={timestampToTimeAgo( offer.date_created ?? 0).asDate}>{timestampToTimeAgo( offer.date_created ?? 0).short}</td>
        <td className="block sm:table-cell"><FcNext style={{width:"30px",height:"30px"}}/></td>
    </tr>
}