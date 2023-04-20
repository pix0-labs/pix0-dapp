import { FC } from "react";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { BuyOffersListView } from "./BuyOffersListView";
import usePage from "../../../hooks/usePage";
import { Page } from "../../../sm/PageActions";
import { BuyOffer, SellOffer} from 'pix0-js';
import { ViewType } from "./MainView";

type props = {
    toSellOfferDetails?: (offer : SellOffer) =>void, 
}

export const BuyOffersView : FC <props> = ({
    toSellOfferDetails
}) =>{

    const {setPage} = usePage();

    const toBuyOfferDetails = (offer : BuyOffer) =>{

        setPage(Page.Market, ViewType.BUY_OFFER_DETAILS, offer);
    }
    
    const backToList = () =>{
        setPage(Page.Market, ViewType.YOUR_SELL_OFFERS);
    }
   
    return <CommonAnimatedDiv className="ml-0"><BuyOffersListView forConnectedWallet={true} 
    toSellOfferDetails={toSellOfferDetails}
    toBuyOfferDetails={toBuyOfferDetails} backToList={backToList}/>
    </CommonAnimatedDiv>
}