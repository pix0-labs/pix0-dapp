import { FC , useEffect} from 'react';
import {Route, Router, useRoute} from 'wouter';
import { MainView } from './MainView';
import { Page } from '../sm/PageActions';

export const AllRoutes : FC = () =>{


    const [matchCreator] = useRoute("/creator");
    const [matchCollector] = useRoute("/collector");
    const [matchMarket] = useRoute("/market");


    const pageTitle = () => {

        if (matchMarket){
            return "NFT Market - Pix0";
        }
        else if (matchCreator){
            return "NFT Creation Tool For Creators - Pix0";
        }
        else if(matchCollector){
            return "Collect Your Favorite NFTs - Pix0"
        }
        else {
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

