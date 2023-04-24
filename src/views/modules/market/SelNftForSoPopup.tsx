import { FC , ReactElement, useState} from "react";
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

    const [open, setOpen] = useState(false);

    const closeModal = () => setOpen(false);

    return <>{trigger ?? <button style={{minWidth:"160px"}} onClick={() => setOpen(o => !o)}
    className="bg-blue-900 font-bold p-1 text-gray-100 rounded-3xl text-xs">
    <AiFillPlusCircle className="mr-1 inline w-4 h-4 text-gray-100"/>Create Sell Offer</button>}
    <Popup modal nested closeOnEscape={false} closeOnDocumentClick={false}
    onClose={closeModal} open={open}><SelNftForSo
    closeModal={closeModal}/></Popup></>
}