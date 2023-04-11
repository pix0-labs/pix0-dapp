import { FC, useState, useEffect } from "react";
import { TopMenu } from "./TopMenu";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import usePage from "../../../hooks/usePage";
import { MarketView } from "./MarketView";
import { SellOffersView } from "./SellOffersView";
import { BuyOffersView } from "./BuyOffersView";

export enum ViewType {

    MARKET = 1,

    YOUR_SELL_OFFERS = 2,

    YOUR_BUY_OFFERS = 3, 
}

export const MainView : FC = () =>{

    const [viewType, setViewType] = useState<ViewType>(ViewType.MARKET);

    const {param} = usePage();


    useEffect(()=>{
        setViewType(param);
    },[param]);

    const switchView = () =>{

        switch(+viewType) {

            case ViewType.MARKET :
                return <MarketView/>;
            
            case ViewType.YOUR_SELL_OFFERS :
                return <SellOffersView/>

            case ViewType.YOUR_BUY_OFFERS :
                return <BuyOffersView/>

            default :
                return <MarketView/>
        }
    }

    return <CommonAnimatedDiv className="text-gray-100 rounded bg-gray-800 h-full p-2">
        <TopMenu viewType={viewType} setViewType={setViewType}/>
        {switchView()}
    </CommonAnimatedDiv>
}