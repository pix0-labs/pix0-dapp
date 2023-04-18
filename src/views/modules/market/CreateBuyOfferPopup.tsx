import { FC , ReactElement} from "react";
import Popup from "reactjs-popup";
import { CreateBuyOfferForm, props as cprops } from "./CreateBuyOfferForm";
import "../../css/Modal.css";

type props = cprops & {

    trigger : ReactElement

}

export const CreateBuyOfferPopup : FC <props> = ({
    trigger, sell_offer_id
}) =>{
    return <Popup modal nested trigger={trigger}
    closeOnEscape={true}><CreateBuyOfferForm sell_offer_id={sell_offer_id}/></Popup>
}