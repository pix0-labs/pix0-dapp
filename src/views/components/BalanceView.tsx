import React, { ReactElement } from "react";
import { FC } from "react";
import usePage from "../../hooks/usePage";
import useBalanceQuerier from "../../hooks/useBalanceQuerier";
import useWalletState from "../../hooks/useWalletState";
import { shortenStringTo,copy } from "pix0-react";
import { UserIconView } from "./UserIconView";
import { Popup} from 'reactjs-popup';
import { ConnectButton, disconnectWallet } from "pix0-react";
import './css/BalanceView.css';
import { Page } from "../../sm/PageActions";

type props =  {

    style? : React.CSSProperties, 

    className? : string, 

    addressLength? : number,

    copyIcon? : ReactElement,

    coinDenom? : string,

    coinDecimals? : number, 

    displayDecimals? : number, 

}

export const BalanceView : FC <props> = ({
    style, className, addressLength, copyIcon, 
    coinDenom, coinDecimals,displayDecimals,
}) =>{

    const {balanceAsStr, address, fetchBalanceNow} = useBalanceQuerier({
        coinDenom : coinDenom,
        coinDecimals : coinDecimals, 
        displayDecimals : displayDecimals, 
    });

    const {setPage} = usePage();

    const {walletConnected, setWalletConnected, setWalletDisconnected} = useWalletState();

    const connectButt =  <ConnectButton experimental={true}
    className="w-3/5 mx-auto text-sm text-gray-100 font-bold"
    onError={(e)=>{
        window.alert(`Error : ${e.message}`);
    }}
    connectedCallback={async ()=>{    
        setWalletConnected();
        setTimeout(async ()=>{
            await fetchBalanceNow();
        },500);
    }}/>;


    const menu =  <Popup contentStyle={{background:"#222",minWidth:"160px"}} 
    arrowStyle={{display:"none"}}
    className="bg-gray-900 text-gray-300 w-64 p-4 m-4"
    trigger={ <button className="ProfileImage"><UserIconView/></button>
   } position="bottom center">
        <div className="rounded hover:bg-gray-600 hover:cursor-pointer 
        bg-gray-800 text-gray-200 p-2 font-bold text-sm"
        onClick={(e)=>{
            e.preventDefault();
            setPage(Page.UserProfile);
        }}
        >User Profile</div>
        <div className="rounded hover:bg-gray-600 hover:cursor-pointer 
        bg-gray-800 text-gray-200 p-2 font-bold text-sm" onClick={async (e)=>{
            e.preventDefault();

            disconnectWallet (()=>{
                setWalletDisconnected();
            });

        }}>Disconnect</div>
     
    </Popup>


    const balView = <>{balanceAsStr}&nbsp;{shortenStringTo(address, addressLength ?? 8)} 
    { copyIcon && <button className="CopyIcon" title="Copy" onClick={(e)=>{
        e.preventDefault();
        copy(address);
    }}>{copyIcon}</button>}
    {menu}
    </>

    return <div className={className ?? "BalanceView"} style={ style }>  
    {walletConnected ? balView : connectButt}  
    </div>
}

export default BalanceView;