import { FC } from "react";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { SellOffersByCollections } from "./SellOffersByCollections";
import { SellOffersListView } from "./SellOffersListView";
import { SelNftForSoPopup } from "./SelNftForSoPopup";
import { CProps } from "./SellOffersListView";


export const MarketView : FC <CProps> = ({
    toSellOfferDetails, backToList
}) =>{

    return <CommonAnimatedDiv className="ml-0 h-full">
    <div className="mr-2 text-right"><SelNftForSoPopup/></div>
    <SellOffersListView toSellOfferDetails={toSellOfferDetails} backToList={backToList}/>
    <SellOffersByCollections/>
    <div className="h-32">&nbsp;</div>
    </CommonAnimatedDiv>
}