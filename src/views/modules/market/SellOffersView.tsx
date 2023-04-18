import { FC } from "react";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { SellOffersListView } from "./SellOffersListView";
import usePage from "../../../hooks/usePage";
import { ViewType } from "./MainView";
import { Page } from "../../../sm/PageActions";
import { SellOffer} from 'pix0-js';

export const SellOffersView : FC = () =>{

    const {setPage} = usePage();

    const toSellOfferDetails = (offer : SellOffer) =>{

        setPage(Page.Market, ViewType.SELL_OFFER_DETAILS, offer);
    }
    
    const backToList = () =>{
        setPage(Page.Market, ViewType.YOUR_SELL_OFFERS);
        console.log("b.to.lst....");
    }
       

    return <CommonAnimatedDiv className="ml-0">
    <SellOffersListView forConnectedWallet={true} title="Your Sell Offers" toSellOfferDetails={toSellOfferDetails}
    backToList={backToList}/>
    </CommonAnimatedDiv>
}