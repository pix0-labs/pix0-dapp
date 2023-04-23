import { FC, useCallback, useEffect, useState } from 'react';
import { SimpleCollectionInfo, SellOffersWithParamsResponse} from 'pix0-js';
import { CommonAnimatedDiv } from '../../components/CommonAnimatedDiv';
import { CommonMessageDiv } from '../../components/CommonMessageDiv';
import { SOView } from './SOView';
import { TfiClose } from 'react-icons/tfi';
import { SellOffer} from 'pix0-js';
import { PulseLoader as Loader } from 'react-spinners';
import { useMarketContract } from 'pix0-react';


export type props = {

    collection_info : SimpleCollectionInfo,

    toSellOfferDetails? : (offer : SellOffer) => void,

    backToList? : () => void, 
}


export const SOBySelectedCollection : FC <props> = ({
    collection_info, toSellOfferDetails, backToList
}) =>{

    const {getSellOffers} = useMarketContract();

    const [sosResp, setSosResp] = useState<SellOffersWithParamsResponse>();

    const fetchSellOffers = useCallback(async ()=>{
        let sos = await getSellOffers(1,collection_info);
        setSosResp(sos);
    },[collection_info]);

    useEffect(()=>{
        fetchSellOffers();
    },[fetchSellOffers]);


    return <CommonAnimatedDiv className="w-full p-2 items-center mx-auto">
    <div className="p-2 text-gray text-left ml-2">
    In Collection <span className="font-bold">{collection_info.collection_name}
    {collection_info.collection_symbol && <span className='ml-2'>({collection_info.collection_symbol})</span>}</span>
    {backToList && <button className="float-right"
            onClick={(e)=>{
                e.preventDefault();
                backToList();
            }}><TfiClose className="mr-4"/></button>}
    </div>
    {

       sosResp?.offers === undefined ?

       <div className="text-left p-2"><Loader color="#eee"/></div>
       :
       sosResp.offers.length > 0 ?

       <div className="flex flex-wrap items-stretch">{
           sosResp.offers?.map((o, _i)=>{
               return <SOView key={`SellOffer_${_i}`} sell_offer={o} index={_i} toSellOfferDetails={toSellOfferDetails}/>
           })
       }</div>
       
       : <CommonMessageDiv>NO Sell Offer in selected collection "{collection_info.collection_name}"</CommonMessageDiv>
   }

   </CommonAnimatedDiv>

}