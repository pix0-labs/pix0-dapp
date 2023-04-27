import { FC} from "react";
import useWalletState from "../hooks/useWalletState";
import { ConnectWalletView } from "./ConnectWalletView";
import {useRoute} from 'wouter';
import { HomeView } from "./HomeView";
import { PageView } from "./PageView";

export const EntryView : FC = () =>{

    const {walletConnected} = useWalletState();

    const [matchMarket] = useRoute("/market");

    const [matchPage] = useRoute("/page/:pageId");


    const switchView = () => {

        if (matchMarket) {

            return <HomeView/>;
        }
        else if (matchPage) {

            return <PageView/>
        }
        else {

            return (walletConnected ? <HomeView/> : <ConnectWalletView/>);
        }

    }
    
    return <>
    {switchView()}
    </>
}