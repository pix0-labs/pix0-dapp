import { FC} from "react";
import usePage from "../hooks/usePage";
import { Page } from "../sm/PageActions";
import { MainView as MarketView } from "./modules/market/MainView";
import { CollectiblesView } from "./modules/collector/CollectiblesView";
import { MainView as UserView } from "./modules/user/MainView";
import { TopBar } from "./TopBar";
import { MainView as CreateCollectionView } from "./modules/creator/MainView";

type props = {

    defaultPage? : Page, 
}

export const MainView : FC <props> = ({
    defaultPage
}) =>{

    const {page} = usePage();

    const switchView = () =>{

        let pg = (page === Page.UserProfile) ? page  : (defaultPage ?? page);
        
        if ( pg ) {

            switch (+pg) {

                case Page.Collectibles :

                    return <CollectiblesView/>;

                case Page.CreateCollection :

                    return <CreateCollectionView/>

                case Page.Market :
                    return <MarketView/>

                case Page.UserProfile :
                    return <UserView/>

                default :
                    return <MarketView/>

            }
        }
        return <MarketView/>
    }

    return <div className="bg-gray-900 h-full w-full">
    <TopBar/>
    {switchView()}
    </div>
}