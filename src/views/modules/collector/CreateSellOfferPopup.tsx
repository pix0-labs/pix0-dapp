import { FC , ReactElement} from "react";
import Popup from "reactjs-popup";
import { CreateSellOfferForm, props as cprops } from "./CreateSellOfferForm";
import "../../css/Modal.css";

type props = cprops & {

    trigger : ReactElement

}

export const CreateSellOfferPopup : FC <props> = ({
    trigger, token , tokenId
}) =>{
    return <Popup modal nested trigger={trigger}
    closeOnEscape={true}><CreateSellOfferForm token={token} tokenId={tokenId}/></Popup>
}