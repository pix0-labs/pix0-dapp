import { FC } from "react";
import { TopMenu } from "./TopMenu";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import usePage from "../../../hooks/usePage";
import {SellOffer} from 'pix0-js';
import { Page } from "../../../sm/PageActions";
import { MarketView } from "./MarketView";
import { SellOffersView } from "./SellOffersView";
import { BuyOffersView } from "./BuyOffersView";
import { SellOfferDetailsView } from "./SellOfferDetailsView";
import { SOBySelectedCollection } from "./SOBySelectedCollections";


export enum ViewType {

    MARKET = 1,

    YOUR_SELL_OFFERS = 2,

    YOUR_BUY_OFFERS = 3, 

    SELL_OFFER_DETAILS = 4, 
    
    BUY_OFFER_DETAILS = 5, 

    SO_BY_SELECTED_COLLECTION = 6, 

}


export const MainView : FC  = () =>{

   
    const {param, param2, setPage} = usePage();

    const toSellOfferDetails = (offer : SellOffer) =>{

        setPage(Page.Market, ViewType.SELL_OFFER_DETAILS, offer);
    }
    
    const backToList = () =>{
        setPage(Page.Market, ViewType.MARKET);
    }
       

    const switchView = () =>{

        switch(+param) {

            case ViewType.MARKET :
                return <MarketView toSellOfferDetails={toSellOfferDetails} backToList={backToList}/>;
            
            case ViewType.YOUR_SELL_OFFERS :
                return <SellOffersView/>

            case ViewType.YOUR_BUY_OFFERS :
                return <BuyOffersView toSellOfferDetails={toSellOfferDetails}/>

            case ViewType.SELL_OFFER_DETAILS :

                return <SellOfferDetailsView offer={param2} backToList={backToList}/>

            case ViewType.SO_BY_SELECTED_COLLECTION :
                return <SOBySelectedCollection collection_info={param2} 
                backToList={backToList}
                toSellOfferDetails={toSellOfferDetails}/>

            default :
                return <MarketView toSellOfferDetails={toSellOfferDetails} backToList={backToList}/>
        }
    }

    return <CommonAnimatedDiv className="text-gray-100 rounded bg-transparent h-full p-2">
        <TopMenu/>
        {switchView()}
    </CommonAnimatedDiv>
}