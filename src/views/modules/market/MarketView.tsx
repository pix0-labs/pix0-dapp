import { FC } from "react";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { SellOffersByCollections } from "./SellOffersByCollections";
import { SellOffersListView } from "./SellOffersListView";
import { CProps } from "./SellOffersListView";


export const MarketView : FC <CProps> = ({
    toSellOfferDetails, backToList
}) =>{

    return <CommonAnimatedDiv className="ml-0 h-full">
    <SellOffersByCollections/>
    <SellOffersListView toSellOfferDetails={toSellOfferDetails} backToList={backToList}/>
    <div className="h-32">&nbsp;</div>
    </CommonAnimatedDiv>
}