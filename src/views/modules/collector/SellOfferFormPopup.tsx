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
    trigger, token , tokenId, isEditMode, sell_offer, createOrUpdateCompletion
}) =>{
    return <Popup modal nested trigger={trigger}
    closeOnEscape={true}><SellOfferForm token={token} tokenId={tokenId}
    isEditMode={isEditMode} sell_offer={sell_offer} createOrUpdateCompletion={createOrUpdateCompletion}/></Popup>
}