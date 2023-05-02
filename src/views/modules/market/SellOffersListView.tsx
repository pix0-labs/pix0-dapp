import { FC, useCallback, useEffect, useState } from "react";
import {useMarketContract} from "pix0-react";
import { connectedWallet } from "../../../utils";
import { PulseLoader as Loader } from "react-spinners";
import { SellOfferRowView } from "./SellOfferRowView";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { CommonMessageDiv } from "../../components/CommonMessageDiv";
import { AiFillCaretDown, AiFillCaretUp} from 'react-icons/ai';
import { PaginationView } from "../../components/PaginationView";
import { SellOffer } from "pix0-js";
import './css/so_list.css';

export type CProps = {

    toSellOfferDetails?: (offer : SellOffer) =>void, 

    backToList? : () => void, 

    forConnectedWallet? : boolean,

    title? : string, 
}

export const SellOffersListView : FC <CProps> = ({
    toSellOfferDetails, backToList, forConnectedWallet, title
}) =>{

    const {getSellOffers, getSellOffersOf} = useMarketContract();

    const [sos, setSos] = useState<SellOffer[]>([]);

    const[loading, setLoading] = useState(false);

    const fetchSellOffers = useCallback (async () =>{
        try {
            setLoading(true);
            let res = forConnectedWallet ? await getSellOffersOf(1,undefined, undefined, connectedWallet()) : await getSellOffers(1);
            setSos(res.offers);
            setLoading(false);    
        }
        catch(e: any){
            setLoading(false);
        }
     }, [forConnectedWallet]);
 

     useEffect(()=>{
         fetchSellOffers();
     },[fetchSellOffers]);

     const [priceSortAsc, setPriceSortAsc] = useState(true);

     const sortByPrice = () =>{
        if (priceSortAsc) {

            setSos(prevSos => [...prevSos].sort((a, b) => parseInt(b.price.amount) - parseInt(a.price.amount)));
            setPriceSortAsc(false);
        }
        else {
            setSos(prevSos => [...prevSos].sort((a, b) => parseInt(a.price.amount) - parseInt(b.price.amount)));
            setPriceSortAsc(true);
        }
    }


    return <CommonAnimatedDiv className="w-full pt-2 pb-2 text-center mx-auto mb-2">
    {
    loading ? <div className="text-left p-2"><Loader color="#eee"/></div>
    :
    (sos?.length ?? 0) > 0 ?
    
    <div className="table-responsive pr-4 mt-1 overflow-y-auto overflow-x-hidden">
       <div className="text-gray-100 font-bold text-left">{ title ?? "Latest Sell Offers"}</div>
       <table className="text-left w-full mt-4 mr-4 border-collapse rounded-md" cellPadding={5} cellSpacing={3}>
        <thead>
            <tr className="bg-gray-800">
                <th className="sticky top-0 NoCol">No.</th>
                <th className="sticky top-0" style={{width:"20%"}}>NFT</th>
                <th className="sticky top-0 cursor-pointer" style={{width:"15%"}}
                onClick={()=>{ sortByPrice();}}>Price (<span className="text-sm">CONST</span>){priceSortAsc ? 
                <AiFillCaretDown className="ml-1 w-4 h-4 inline"/> : <AiFillCaretUp className="ml-1 w-4 h-4 inline"/>}</th>
                {!forConnectedWallet && <th className="sticky top-0" style={{width:"15%"}}>By</th>}
                <th className="sticky top-0 text-center" style={{width:"15%"}}>{ forConnectedWallet ? "Buy Offers" : "In Collection" }</th>
                <th className="sticky top-0" style={{width:"10%"}}>&nbsp;</th> 
                <th className="sticky top-0 NextArrow" style={{width:"10%"}}>&nbsp;</th>
            </tr>
        </thead>
        <tbody>
        {
            sos?.map((o, _i)=>{
                return <SellOfferRowView key={`SellOfferRow_${_i}`} offer={o} index={_i} 
                toSellOfferDetails ={toSellOfferDetails} backToList={backToList}
                forConnectedWallet={forConnectedWallet}/>
            })
        }</tbody>

        <tr>
            <td colSpan={forConnectedWallet ? 7 : 8}>
                <PaginationView param={{totalCount : 52, pageSize :10, currentPage:1, siblingCount:1}}/>
            </td>
        </tr>
    </table>
    </div>
    : <CommonMessageDiv>NO Active sell offers...</CommonMessageDiv>
    }
    </CommonAnimatedDiv>
}