import { FC } from "react";
import { CollectionIndex} from 'pix0-js';
import { timestampToTimeAgo } from "pix0-react";
import { FcNext } from "react-icons/fc";


type props = {

    collectionIndex : CollectionIndex,

    index? : number, 
}

export const CollectionIndexView : FC <props> = ({
    collectionIndex, index 
}) =>{

    const dateCreated = timestampToTimeAgo(collectionIndex.date_created ?? 0);

    return <tr className="hover:bg-gray-700 border-b border-slate-600">
        <td className="sticky top-0" style={{width:"5%"}}>{((index ?? 0)+1)}</td>
        <td className="sticky top-0" style={{width:"25%"}}>{collectionIndex.collection_info.collection_name} ({collectionIndex.collection_info.collection_symbol})</td>
        <td className="sticky top-0" style={{width:"25%"}}>{collectionIndex.number_of_sell_offers}</td>
        <td className="sticky top-0" title={dateCreated.asDate} style={{width:"10%"}}>{ dateCreated.short}</td> 
        <td className="sticky top-0" style={{width:"10%"}}><FcNext style={{width:"30px",height:"30px"}}/></td>
    </tr>
     
}