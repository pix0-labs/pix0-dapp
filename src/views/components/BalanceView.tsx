import React, { ReactElement } from "react";
import { FC } from "react";
import useBalanceQuerier from "../../hooks/useBalanceQuerier";
import { shortenStringTo,copy } from "pix0-react";
import { UserIconView } from "./UserIconView";
import './css/BalanceView.css';

type props =  {

    style? : React.CSSProperties, 

    className? : string, 

    addressLength? : number,

    copyIcon? : ReactElement,

    coinDenom? : string,

    coinDecimals? : number, 

    displayDecimals? : number, 

    profileIconOnClick? : ()=> void, 
}

export const BalanceView : FC <props> = ({
    style, className, addressLength, copyIcon, 
    coinDenom, coinDecimals,displayDecimals, profileIconOnClick
}) =>{

    const {balanceAsStr, address} = useBalanceQuerier({
        coinDenom : coinDenom,
        coinDecimals : coinDecimals, 
        displayDecimals : displayDecimals, 
    });


    return <div className={className ?? "BalanceView"} style={ style }>    
    {balanceAsStr}&nbsp;{shortenStringTo(address, addressLength ?? 8)} 
    { copyIcon && <button className="CopyIcon" title="Copy" onClick={(e)=>{
        e.preventDefault();
        copy(address);
    }}>{copyIcon}</button>}
    <button className="ProfileImage" 
    onClick={(e)=>{
        e.preventDefault();
        if ( profileIconOnClick)   
            profileIconOnClick(); 
    }}
    title="Click to view user profile">
    <UserIconView/></button>
    </div>
}

export default BalanceView;