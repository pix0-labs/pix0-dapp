import { FC, useEffect } from "react";
import useWalletState from "../hooks/useWalletState";
import { ConnectWalletView } from "./ConnectWalletView";
import {useRoute} from 'wouter';
import usePage from "../hooks/usePage";
import { ViewType as MarketViewType } from "./modules/market/MainView";
import { ViewType as CreatorViewType } from "./modules/creator/CollectionsView";
import { ViewType as CollectorViewType } from "./modules/collector/NFTsView";
import { Page } from "../sm/PageActions";
import { HomeView } from "./HomeView";

export const EntryView : FC = () =>{

    const {walletConnected} = useWalletState();

    return <>
    {walletConnected ? <HomeView/> : <ConnectWalletView/>}
    </>
}