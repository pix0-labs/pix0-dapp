import { FC , ReactElement} from "react";
import Popup from "reactjs-popup";
import { AcceptBuyOfferForm, props as cprops } from "./AcceptBuyOfferForm";
import "../../css/Modal.css";

type props = cprops & {

    trigger? : ReactElement

}

export const AcceptBuyOfferPopup : FC <props> = ({
    trigger, buy_offer
}) =>{
    return <Popup modal nested trigger={trigger ?? <button style={{minWidth:"100px"}}
    className="bg-green-700 font-bold p-1 text-gray-100 rounded-3xl">Accept</button>}
    closeOnEscape={true}><AcceptBuyOfferForm buy_offer={buy_offer}/></Popup>
}