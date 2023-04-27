import { FC, useCallback, useEffect, useState } from "react";
import { useMarketContract } from "pix0-react";
import { SellOffer} from 'pix0-js';
import { SellOfferDetailsView } from "./SellOfferDetailsView";

type props ={

    offer_id : string, 
}

export const SellOfferDetailsPage : FC <props> = ({
    offer_id
}) =>{

    const {getSellOfferById} = useMarketContract();

    const [offer, setOffer] = useState<SellOffer>();

    const fetchSo = useCallback (async ()=>{
        let so = await getSellOfferById(offer_id);
        setOffer(so);
    },[offer_id]);

    useEffect(()=>{
        fetchSo();
    },[fetchSo]);

    return <>{offer && <SellOfferDetailsView offer={offer}/>}</>
}