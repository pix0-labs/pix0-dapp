import { FC } from "react";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { SellOffersByCollections } from "./SellOffersByCollections";

export const MarketView : FC = () =>{

    return <CommonAnimatedDiv className="ml-0">
    <SellOffersByCollections/>
    </CommonAnimatedDiv>
}