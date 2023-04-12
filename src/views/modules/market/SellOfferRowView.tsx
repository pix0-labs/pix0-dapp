import { FC} from "react";
import { SellOffer, toCoinStr} from 'pix0-js';
import { useNftLoader } from "../../../hooks/useNftLoader";
import { CProps } from "./SellOffersListView";
import { FcNext } from "react-icons/fc";
import placeholder from '../../../images/placeholder2.png';
import { off } from "process";


type props = CProps & {

    offer : SellOffer, 

    index? : number, 
}

export const SellOfferRowView : FC <props> = ({
    offer, index, toSellOfferDetails 
}) =>{

    const {image, token, collectionName} = useNftLoader(offer.token_id);

    const imgView = image ? <a href={image}
    target="_blank"><img className="mr-3" src={image} style={{height:"40px",width:"40px",display:"inline-block"}}  
    placeholder={placeholder}/></a> :
    <img src={placeholder} className="mr-3" style={{height:"40px",width:"40px",display:"inline-block"}} placeholder={placeholder}/>;

    return <tr className="border-b border-slate-600 hover:bg-gray-700 p-2 cursor-pointer"
    onClick={()=>{
        if (toSellOfferDetails) {
            toSellOfferDetails(offer);
        }
    }}>
        <td className="block sm:table-cell">{(index ?? 0)+1}</td>
        <td className="block sm:table-cell text-left">{imgView}
        <span className="font-bold text-sm truncate" 
        style={{maxWidth:"100px"}}>{token?.extension.name}</span>
        </td>
        <th title={`${offer.price.amount}${offer.price.denom}`} className="sticky top-0" 
        
        style={{width:"20%"}}>{toCoinStr(parseFloat(offer.price.amount),3, offer.price.denom)}</th>
        <th className="sticky top-0" style={{width:"20%"}}>{offer.owner}</th>
        <th className="sticky top-0" style={{width:"20%"}}>{collectionName}</th>
        <td className="block sm:table-cell"><FcNext style={{width:"30px",height:"30px"}}/></td>
    </tr>
}