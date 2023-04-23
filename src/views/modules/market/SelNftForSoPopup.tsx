import { FC , ReactElement} from "react";
import Popup from "reactjs-popup";
import { SelNftForSo } from "./SelNftForSo";
import { AiFillPlusCircle } from "react-icons/ai";
import "../../css/Modal.css";

type props =  {

    trigger? : ReactElement

}

export const SelNftForSoPopup : FC <props> = ({
    trigger
}) =>{
    return <Popup modal nested trigger={trigger ?? <button style={{minWidth:"160px"}}
    className="bg-blue-900 font-bold p-1 text-gray-100 rounded-3xl text-xs">
    <AiFillPlusCircle className="mr-1 inline w-4 h-4 text-gray-100"/>Create Sell Offer</button>}
    closeOnEscape={true}><SelNftForSo/></Popup>
}