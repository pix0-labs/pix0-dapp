import { FC , ReactElement} from "react";
import Popup from "reactjs-popup";
import { TxNftForm, props as cprops } from "./TxNftForm";
import "../../css/Modal.css";

type props = cprops & {

    trigger : ReactElement,
}

export const TxNftFormPopup : FC <props> = ({
    trigger, token , tokenId}) =>{
    return <Popup modal nested trigger={trigger}
    closeOnEscape={true}><TxNftForm token={token} tokenId={tokenId}/></Popup>
}