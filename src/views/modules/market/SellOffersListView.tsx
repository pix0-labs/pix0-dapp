import { FC, useCallback, useEffect, useState } from "react";
import {useMarketContract} from "pix0-react";
import { PulseLoader as Loader } from "react-spinners";
import { SellOfferRowView } from "./SellOfferRowView";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { CommonMessageDiv } from "../../components/CommonMessageDiv";
import { SellOffer } from "pix0-js";

const testSos = () =>{

    let sos : SellOffer[] = [];

    for (var r =0; r< 15; r ++){

        let amt = (r+2) * 7250;
        sos.push({
            token_id : `Tok_00${r}`,
            owner : `Alice_${r}`,
            price : {amount : `${amt}`, denom : "uconst"},
            allowed_direct_buy : true, 
            status: 0,
            contract_addr : "xxx",
        });
    }

    //console.log("sos::", sos);
    return sos; 
}


export type CProps = {

    toSellOfferDetails?: (offer : SellOffer) =>void, 

    backToList? : () => void, 
}

export const SellOffersListView : FC <CProps> = ({
    toSellOfferDetails, backToList
}) =>{

    const {getSellOffers} = useMarketContract();

    const [sos, setSos] = useState<SellOffer[]>(testSos());

    const[loading, setLoading] = useState(false);

    const fetchSellOffers = useCallback (async () =>{
        try {
            setLoading(true);
            let res = await getSellOffers(1);
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

    return <CommonAnimatedDiv className="w-full pt-2 pb-2 text-center mx-auto h-full">
    {
    loading ? <div className="text-left p-2"><Loader color="#eee"/></div>
    :
    (sos?.length ?? 0) > 0 ?
    
    <div className="table-responsive pr-4 mt-10">
       <div className="text-gray-100 font-bold text-left">Latest Sell Offers</div>
       <table className="text-left w-full mt-4 mr-4 border-collapse rounded-md" cellPadding={5} cellSpacing={3}>
        <thead>
            <tr className="bg-gray-700">
                <th className="sticky top-0" style={{width:"5%"}}>No.</th>
                <th className="sticky top-0" style={{width:"20%"}}>NFT</th>
                <th className="sticky top-0" style={{width:"15%"}}>Price</th>
                <th className="sticky top-0" style={{width:"20%"}}>By</th>
                <th className="sticky top-0" style={{width:"20%"}}>In Collection</th>
                <th className="sticky top-0" style={{width:"10%"}}>&nbsp;</th>
            </tr>
        </thead>
        <tbody>
        {
            sos?.map((o, _i)=>{
                return <SellOfferRowView key={`SellOfferRow_${_i}`} offer={o} index={_i} 
                toSellOfferDetails ={toSellOfferDetails} backToList={backToList}/>
            })
        }</tbody>
    </table>
    </div>
    : <CommonMessageDiv>NO Active sell offers...</CommonMessageDiv>
    }
    </CommonAnimatedDiv>
}