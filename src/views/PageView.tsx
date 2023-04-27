import { FC } from "react";
import {Route, Router} from 'wouter';
import { MintPageView } from './modules/creator/MintPageView';

export const PageView : FC = () =>{

    return <Router><Route path="/page/:pageId">
        {(params) => <MintPageView pageId={params.pageId ?? ""}/>}
        </Route>
    </Router>

}