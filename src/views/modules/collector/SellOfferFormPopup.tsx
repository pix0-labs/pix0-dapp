import { FC , ReactElement} from "react";
import Popup from "reactjs-popup";
import { SellOffer} from 'pix0-js';
import { SellOfferForm, props as cprops } from "./SellOfferForm";
import "../../css/Modal.css";

type props = cprops & {

    trigger : ReactElement,

    isEditMode? : boolean,

    sell_offer? : SellOffer,

    createOrUpdateCompletion? : () => void, 

}

export const SellOfferFormPopup : FC <props> = ({
    trigger, token , tokenId, isEditMode, sell_offer, createOrUpdateCompletion, contractAddr
}) =>{
    return <Popup modal nested trigger={trigger}
    closeOnEscape={true}><SellOfferForm token={token} tokenId={tokenId} contractAddr={contractAddr}
    isEditMode={isEditMode} sell_offer={sell_offer} createOrUpdateCompletion={createOrUpdateCompletion}/></Popup>
}