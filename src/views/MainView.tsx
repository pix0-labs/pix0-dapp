import { FC } from "react";
import usePage from "../hooks/usePage";
import { Page } from "../sm/PageActions";
import { MintNFTView } from "./modules/MintNFTView";
import { MarketView } from "./modules/MarketView";
import { CollectiblesView } from "./modules/CollectiblesView";
import { TopBar } from "./TopBar";
import { MainView as CreateCollectionView } from "./modules/collections/MainView";

export const MainView : FC = () =>{

    const {page} = usePage();

    const switchView = () =>{

        if ( page ) {

            switch (+page) {

                case Page.MintNFT :
                    
                    return <MintNFTView/>;

                case Page.Collectibles :

                    return <CollectiblesView/>;

                case Page.CreateCollection :

                    return <CreateCollectionView/>

                case Page.Market :
                    return <MarketView/>
                default :
                    return <MarketView/>

            }
        }
        return <MarketView/>
    }

    return <div className="bg-gray-900 h-screen">
    <TopBar/>
    {switchView()}
    </div>
}