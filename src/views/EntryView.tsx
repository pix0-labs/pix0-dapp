import { FC } from "react";
import useWalletState from "../hooks/useWalletState";
import { ConnectWalletView } from "./ConnectWalletView";
import { HomeView } from "./HomeView";

export const EntryView : FC = () =>{

    const {walletConnected} = useWalletState();

    return <>
    {walletConnected ? <HomeView/> : <ConnectWalletView/>}
    </>
}