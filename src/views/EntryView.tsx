import { FC} from "react";
import useWalletState from "../hooks/useWalletState";
import { ConnectWalletView } from "./ConnectWalletView";
import {useRoute} from 'wouter';
import { HomeView } from "./HomeView";

export const EntryView : FC = () =>{

    const {walletConnected} = useWalletState();

    const [matchMarket] = useRoute("/market");
    
    return <>
    {matchMarket ? <HomeView/> :  (walletConnected ? <HomeView/> : <ConnectWalletView/>)}
    </>
}