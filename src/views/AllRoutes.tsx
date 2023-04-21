import { FC , useEffect} from 'react';
import {Route, Router, useRoute} from 'wouter';
import { MainView } from './MainView';
import { ViewType as MarketViewType } from './modules/market/MainView';
import { ViewType as CollectorViewType } from './modules/creator/CollectionsView';
import { Page } from '../sm/PageActions';

export const AllRoutes : FC = () =>{


    const [matchCreator] = useRoute("/creator");
    const [matchCollector] = useRoute("/collector");
    const [matchMarket] = useRoute("/market");


    const pageTitle = () => {

        if (matchMarket){

            //setPage(Page.Market, MarketViewType.MARKET);
            return "NFT Market - Pix0";
        }
        else if (matchCreator){

            //setPage(Page.CreateCollection, CreatorViewType.LIST);
            return "NFT Creation Tool For Creators - Pix0";
        }
        else if(matchCollector){

            //setPage(Page.Collectibles, CollectorViewType.LIST);
            return "Collect Your Favorite NFTs - Pix0"
        }
        else {

            //setPage(Page.Market, MarketViewType.MARKET);
            return "NFT Market - Pix0";
        }
        
    }

    useEffect(() => {
        document.title = pageTitle();
        // eslint-disable-next-line
    }, [pageTitle()]);

    return <Router>
        <Route path="/">
            <MainView/>
        </Route>
        <Route path="/creator">
            <MainView defaultPage={Page.CreateCollection}/>
        </Route>
        <Route path="/collector">
            <MainView defaultPage={Page.Collectibles}/>
        </Route>
        <Route path="/market">
            <MainView defaultPage={Page.Market}/>
        </Route>
    </Router>
}

