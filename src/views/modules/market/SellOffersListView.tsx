import { FC, useCallback, useEffect, useState } from "react";
import {useMarketContract} from "pix0-react";
import { connectedWallet } from "../../../utils";
import { PulseLoader as Loader } from "react-spinners";
import { SellOfferRowView } from "./SellOfferRowView";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { CommonMessageDiv } from "../../components/CommonMessageDiv";
import { SellOffer } from "pix0-js";

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

    const [sos, setSos] = useState<SellOffer[]>();

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
     }, []);
 

     useEffect(()=>{
         fetchSellOffers();
     },[fetchSellOffers]);

    return <CommonAnimatedDiv className="w-full pt-2 pb-2 text-center mx-auto mb-2">
    {
    loading ? <div className="text-left p-2"><Loader color="#eee"/></div>
    :
    (sos?.length ?? 0) > 0 ?
    
    <div className="table-responsive pr-4 mt-1 overflow-y-auto overflow-x-hidden">
       <div className="text-gray-100 font-bold text-left">{ title ?? "Latest Sell Offers"}</div>
       <table className="text-left w-full mt-4 mr-4 border-collapse rounded-md" cellPadding={5} cellSpacing={3}>
        <thead>
            <tr className="bg-gray-900">
                <th className="sticky top-0" style={{width:"5%"}}>No.</th>
                <th className="sticky top-0" style={{width:"20%"}}>NFT</th>
                <th className="sticky top-0" style={{width:"15%"}}>Price</th>
                {!forConnectedWallet && <th className="sticky top-0" style={{width:"15%"}}>By</th>}
                <th className="sticky top-0" style={{width:"15%"}}>In Collection</th>
                <th className="sticky top-0" style={{width:"10%"}}>&nbsp;</th> 
                <th className="sticky top-0" style={{width:"10%"}}>&nbsp;</th>
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
    </table>
    </div>
    : <CommonMessageDiv>NO Active sell offers...</CommonMessageDiv>
    }
    </CommonAnimatedDiv>
}