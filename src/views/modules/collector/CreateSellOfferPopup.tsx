import { FC , ReactElement} from "react";
import { Nft} from 'pix0-js';
import Popup from "reactjs-popup";
import "./css/Modal.css";
import placeholder from '../../../images/placeholder2.png';

type props = {

    trigger : ReactElement, 

    token? : Nft,

}

export const CreateSellOfferPopup : FC <props> = ({
    trigger, token 
}) =>{

    const imgView = token?.extension.image ? <a href={token.extension.image}
    target="_blank"><img className="rounded mx-auto" src={token.extension.image} 
    style={{height:"100px",width:"100px",display:"block",border:"5px solid rgba(240,240,250,.35)"}}  
    placeholder={placeholder}/></a> :
    <img src={placeholder} className="mx-auto rounded-full" style={{height:"200px",width:"200px",display:"block"}} 
    placeholder={placeholder}/>;

    const div = <div className="modal rounded bg-gray-800 w-full text-center text-gray-100 p-2">
    <div className="mb-2 header">Create Sell Offer For</div>
    <div className="content">
        <div className="mb-2">{imgView}</div>
        <div className="mb-2 font-bold text-sm">{token?.extension.name}</div>
    </div>
    </div>;

    return <Popup modal nested trigger={trigger}>{div}</Popup>
}