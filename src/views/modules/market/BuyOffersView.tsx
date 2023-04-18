import { FC } from "react";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { BuyOffersListView } from "./BuyOffersListView";
import usePage from "../../../hooks/usePage";
import { Page } from "../../../sm/PageActions";
import { BuyOffer} from 'pix0-js';
import { ViewType } from "./MainView";

export const BuyOffersView : FC = () =>{

    const {setPage} = usePage();

    const toBuyOfferDetails = (offer : BuyOffer) =>{

        setPage(Page.Market, ViewType.BUY_OFFER_DETAILS, offer);
    }
    
    const backToList = () =>{
        setPage(Page.Market, ViewType.YOUR_SELL_OFFERS);
    }
   
    return <CommonAnimatedDiv className="ml-0"><BuyOffersListView forConnectedWallet={true} toBuyOfferDetails={toBuyOfferDetails} backToList={backToList}/>
    </CommonAnimatedDiv>
}