import { FC, useCallback, useEffect, useState } from "react";
import {useMarketContract} from "pix0-react";
import { connectedWallet} from "../../../utils";
import { PulseLoader as Loader } from "react-spinners";
import { BuyOfferRowView } from "./BuyOfferRowView";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { CommonMessageDiv } from "../../components/CommonMessageDiv";
import { CreateBuyOfferPopup } from "./CreateBuyOfferPopup";
import { TxHashDiv } from "../../components/TxHashDiv";
import useTxHash from "../../../hooks/useTxHash";
import { BuyOffer, SellOffer } from "pix0-js";

export type CProps = {

    toBuyOfferDetails?: (offer : BuyOffer) =>void, 

    toSellOfferDetails?: (offer : SellOffer) =>void, 

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
    noBuyOfferClassName, withAcceptButton, toSellOfferDetails
}) =>{

    const {getBuyOffersOf, getBuyOffersBy} = useMarketContract();

    const [bos, setBos] = useState<BuyOffer[]>([]);

    const[loading, setLoading] = useState(false);

    const {txHash, setTxHash} = useTxHash();

    const [processing, setProcessing] = useState(false);

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
            //console.log("ex...",e);
        }
     }, [sell_offer_id]);


     const [dateSortAsc, setDateSortAsc] = useState(true);

     const [priceSortAsc, setPriceSortAsc] = useState(true);

     const sortByDate = () =>{
        if (dateSortAsc) {

            setBos(prevBos => [...prevBos].sort((a, b) => (b.date_created ?? 0) - (a.date_created ?? 0)));
            setDateSortAsc(false);
        }
        else {
            setBos(prevBos => [...prevBos].sort((a, b) => (a.date_created ?? 0) - (b.date_created ?? 0)));
            setDateSortAsc(true);
        }
     }
 
     const sortByPrice = () =>{
        if (priceSortAsc) {

            setBos(prevBos => [...prevBos].sort((a, b) => parseInt(b.price.amount) - parseInt(a.price.amount)));
            setPriceSortAsc(false);
        }
        else {
            setBos(prevBos => [...prevBos].sort((a, b) => parseInt(a.price.amount) - parseInt(b.price.amount)));
            setPriceSortAsc(true);
        }
    }
 

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
       {txHash && <TxHashDiv txHash={txHash}/>}
       {processing && <Loader color="white" size={8} className="float-left"/>}
       <table className="text-left w-full mt-4 mr-4 border-collapse rounded-md" cellPadding={5} cellSpacing={3}>
        <thead>
            <tr className="bg-gray-800">
                <th className="sticky top-0" style={{width:"5%"}}>No.</th>
                <th className="sticky top-0" style={{width:"25%"}}>Sell Offer</th>
                <th className="sticky top-0 cursor-pointer" 
                style={{width:"25%"}} onClick={()=>{
                    sortByPrice();
                }}>Price</th>
                {!forConnectedWallet && <th className="sticky top-0" style={{width:"30%"}}>By</th>}
                <th className="sticky top-0 cursor-pointer" style={{width:"10%"}} onClick={()=>{
                    sortByDate();
                }}>Date</th> 
                <th className="sticky top-0" style={{width:"10%"}}>&nbsp;</th>
            </tr>
        </thead>
        <tbody>
        {
            bos?.map((o, _i)=>{
                return <BuyOfferRowView key={`BuyOfferRow_${_i}`} offer={o} index={_i} toSellOfferDetails={toSellOfferDetails}
                toBuyOfferDetails ={toBuyOfferDetails} backToList={backToList} setProcessing={setProcessing}
                setTxHash={setTxHash} forConnectedWallet={forConnectedWallet} withAcceptButton={withAcceptButton}/>
            })
        }</tbody>
    </table>
    </div>
    : <CommonMessageDiv className={noBuyOfferClassName}>NO buy offers...</CommonMessageDiv>}
    </>}

    </CommonAnimatedDiv>
}