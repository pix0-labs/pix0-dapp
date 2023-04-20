import { FC, useCallback, useEffect, useState } from "react";
import {useMarketContract} from "pix0-react";
import { connectedWallet} from "../../../utils";
import { PulseLoader as Loader } from "react-spinners";
import { BuyOfferRowView } from "./BuyOfferRowView";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { CommonMessageDiv } from "../../components/CommonMessageDiv";
import { CreateBuyOfferPopup } from "./CreateBuyOfferPopup";
import { BuyOffer } from "pix0-js";

export type CProps = {

    toBuyOfferDetails?: (offer : BuyOffer) =>void, 

    backToList? : () => void, 

    forConnectedWallet? : boolean,

    sell_offer_id? : string, 

    title? : string, 

    withCreateBuyOfferButton? : boolean, 

    noBuyOfferClassName? : string, 

    withAcceptButton? : boolean, 
}

export const BuyOffersListView : FC <CProps> = ({
    toBuyOfferDetails, backToList, forConnectedWallet, 
    title, sell_offer_id, withCreateBuyOfferButton,
    noBuyOfferClassName, withAcceptButton
}) =>{

    const {getBuyOffersOf, getBuyOffersBy} = useMarketContract();

    const [bos, setBos] = useState<BuyOffer[]>();

    const[loading, setLoading] = useState(false);

    const fetchBuyOffers = useCallback (async () =>{
        try {
            setLoading(true);
            let res = forConnectedWallet ? await getBuyOffersOf(undefined, undefined, undefined,
                connectedWallet()) : await getBuyOffersBy(sell_offer_id ?? "" );

            setBos(res.offers);
            setLoading(false);    
        }
        catch(e: any){
            setLoading(false);
            console.log("ex...",e);
        }
     }, [sell_offer_id]);
 

     useEffect(()=>{
         fetchBuyOffers();
     },[fetchBuyOffers]);



    return <CommonAnimatedDiv className="w-full pt-2 pb-2 text-center mx-auto mb-2">
    {
    loading ? <div className="text-left p-2"><Loader color="#eee"/></div>
    :
    <>
    {withCreateBuyOfferButton && 
    <CreateBuyOfferPopup trigger={<button className="p-2 rounded-3xl bg-green-800 text-gray-100 font-bold" 
    style={{minWidth:"220px"}}>Create Buy Offer</button>} sell_offer_id={sell_offer_id}/>}
   
    {(bos?.length ?? 0) > 0 ?
    
    <div className="table-responsive pr-4 mt-1">
       <div className="text-gray-100 font-bold text-left">{ title ?? "Latest Buy Offers"}</div>
       <table className="text-left w-full mt-4 mr-4 border-collapse rounded-md" cellPadding={5} cellSpacing={3}>
        <thead>
            <tr className="bg-gray-800">
                <th className="sticky top-0" style={{width:"5%"}}>No.</th>
                <th className="sticky top-0" style={{width:"25%"}}>Sell Offer</th>
                <th className="sticky top-0" style={{width:"25%"}}>Price</th>
                {!forConnectedWallet && <th className="sticky top-0" style={{width:"30%"}}>By</th>}
                <th className="sticky top-0" style={{width:"10%"}}>&nbsp;</th> 
                <th className="sticky top-0" style={{width:"10%"}}>&nbsp;</th>
            </tr>
        </thead>
        <tbody>
        {
            bos?.map((o, _i)=>{
                return <BuyOfferRowView key={`BuyOfferRow_${_i}`} offer={o} index={_i} 
                toBuyOfferDetails ={toBuyOfferDetails} backToList={backToList} 
                forConnectedWallet={forConnectedWallet} withAcceptButton={withAcceptButton}/>
            })
        }</tbody>
    </table>
    </div>
    : <CommonMessageDiv className={noBuyOfferClassName}>NO buy offers...</CommonMessageDiv>}
    </>}

    </CommonAnimatedDiv>
}