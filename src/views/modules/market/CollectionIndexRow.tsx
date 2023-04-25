import { FC ,useCallback, useEffect, useState,} from "react";
import { CollectionIndex} from 'pix0-js';
import { timestampToTimeAgo } from "pix0-react";
import { useNftLoader } from "../../../hooks/useNftLoader";
import usePage from "../../../hooks/usePage";
import { TokenImageView } from "../../components/TokenImageView";
import { useMarketContract } from "pix0-react";
import { Page } from "../../../sm/PageActions";
import { ViewType } from "./MainView";
import { FcNext } from "react-icons/fc";
import '../../css/SmallImg.css';
import './css/c_index.css';


type props = {

    collectionIndex : CollectionIndex,

    index? : number, 
}

export const CollectionIndexRow : FC <props> = ({
    collectionIndex, index 
}) =>{

    const {getSellOffers} = useMarketContract();

    const [firstTokenId, setFirstTokenId] = useState("");

    const {image} = useNftLoader(firstTokenId);

    const fetchFirstImage = useCallback(async ()=>{
        let sos = await getSellOffers(1,collectionIndex.collection_info,0,1);
        if ( sos.offers.length > 0){
            setFirstTokenId(sos.offers[0].token_id);
        }
    },[collectionIndex.collection_info]);

    useEffect(()=>{
        fetchFirstImage();
    },[fetchFirstImage])

    const {setPage} = usePage();

    const dateCreated = timestampToTimeAgo(collectionIndex.date_created ?? 0);

    return <tr className="hover:bg-gray-700 border-b border-slate-600 cursor-pointer text-sm"
    onClick={()=>{
        setPage(Page.Market, ViewType.SO_BY_SELECTED_COLLECTION, collectionIndex.collection_info );
    }}>
        <td className="sticky top-0" style={{width:"5%"}}>{((index ?? 0)+1)}</td>
        <td className="sticky top-0" style={{width:"25%"}}>
        <TokenImageView image={image} className="sm_img_container"/>
        <div className="inline-block ml-1 truncate CollName">
        {collectionIndex.collection_info.collection_name} ({collectionIndex.collection_info.collection_symbol})
        </div>
       </td>
        <td className="sticky top-0 text-center" style={{width:"25%"}}>{collectionIndex.number_of_sell_offers}</td>
        <td className="sticky top-0 text-center" title={dateCreated.asDate} style={{width:"10%"}}>{ dateCreated.short}</td> 
        <td className="sticky top-0" style={{width:"10%"}}><FcNext style={{width:"30px",height:"30px"}}/></td>
    </tr>
     
}