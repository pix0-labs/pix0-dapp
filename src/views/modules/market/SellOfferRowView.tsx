import { FC} from "react";
import { SellOffer, toCoinStr} from 'pix0-js';
import { useNftLoader } from "../../../hooks/useNftLoader";
import { CProps } from "./SellOffersListView";
import { FcNext } from "react-icons/fc";
import { shortenStringTo, timestampToTimeAgo } from "pix0-react";
import { TokenImageView } from "../../components/TokenImageView";
import '../../css/SmallImg.css';

type props = CProps & {

    offer : SellOffer, 

    index? : number, 
}

export const SellOfferRowView : FC <props> = ({
    offer, index, toSellOfferDetails 
}) =>{

    const {image, token, getCollectionName} = useNftLoader(offer.token_id);

    return <tr className="border-b border-slate-600 hover:bg-gray-700 p-2 cursor-pointer"
    onClick={()=>{
        if (toSellOfferDetails) {
            toSellOfferDetails(offer);
        }
    }}>
        <td className="block sm:table-cell">{(index ?? 0)+1}</td>
        <td className="block sm:table-cell text-left">
        <TokenImageView image={image} className="sm_img_container"/>
        <div className="font-bold text-sm truncate inline-block ml-2" 
        style={{maxWidth:"100px"}}>{token?.extension.name}</div>
        </td>
        <th title={`${offer.price.amount}${offer.price.denom}`} className="sticky top-0" 
        
        style={{width:"20%"}}>{toCoinStr(parseFloat(offer.price.amount),3, offer.price.denom)} CONST</th>
        <th className="sticky top-0" style={{width:"15%"}}>{shortenStringTo(offer.owner, 10)}</th>
        <th className="sticky top-0 truncate" title={getCollectionName()} style={{width:"15%", maxWidth:"80px"}}>{getCollectionName()}</th>
        <th className="sticky top-0" style={{width:"10%"}} 
        title={timestampToTimeAgo( offer.date_created ?? 0).asDate}>{timestampToTimeAgo( offer.date_created ?? 0).short}</th>
        <td className="block sm:table-cell"><FcNext style={{width:"30px",height:"30px"}}/></td>
    </tr>
}