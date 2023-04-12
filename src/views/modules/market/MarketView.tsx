import { FC } from "react";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { SellOffersByCollections } from "./SellOffersByCollections";
import { SellOffersListView } from "./SellOffersListView";
export const MarketView : FC = () =>{

    return <CommonAnimatedDiv className="ml-0">
    <SellOffersByCollections/>
    <SellOffersListView/>
    </CommonAnimatedDiv>
}