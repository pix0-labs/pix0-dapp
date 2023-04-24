import { FC } from "react";
import { CollectionIndex} from 'pix0-js';
import { timestampToTimeAgo } from "pix0-react";
import usePage from "../../../hooks/usePage";
import { Page } from "../../../sm/PageActions";
import { ViewType } from "./MainView";
import { FcNext } from "react-icons/fc";


type props = {

    collectionIndex : CollectionIndex,

    index? : number, 
}

export const CollectionIndexRow : FC <props> = ({
    collectionIndex, index 
}) =>{

    const {setPage} = usePage();

    const dateCreated = timestampToTimeAgo(collectionIndex.date_created ?? 0);

    return <tr className="hover:bg-gray-700 border-b border-slate-600 cursor-pointer text-sm"
    onClick={()=>{
        setPage(Page.Market, ViewType.SO_BY_SELECTED_COLLECTION, collectionIndex.collection_info );
    }}>
        <td className="sticky top-0" style={{width:"5%"}}>{((index ?? 0)+1)}</td>
        <td className="sticky top-0" style={{width:"25%"}}>{collectionIndex.collection_info.collection_name} ({collectionIndex.collection_info.collection_symbol})</td>
        <td className="sticky top-0 text-center" style={{width:"25%"}}>{collectionIndex.number_of_sell_offers}</td>
        <td className="sticky top-0 text-center" title={dateCreated.asDate} style={{width:"10%"}}>{ dateCreated.short}</td> 
        <td className="sticky top-0" style={{width:"10%"}}><FcNext style={{width:"30px",height:"30px"}}/></td>
    </tr>
     
}