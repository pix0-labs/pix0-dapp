import { FC , ReactElement, useState} from "react";
import Popup from "reactjs-popup";
import { RewardsView } from "./RewardsView";
import "../../css/SModal.css";

type props = {

    trigger?: ReactElement,
}


export const UserClaimPopup : FC <props>  = ({
    trigger
}) =>{

    const [open, setOpen] = useState(false);

    const closeModal = () => setOpen(false);

    return <Popup modal contentStyle={{maxWidth:"480px",background:"transparent"}} 
    trigger={trigger ?? <div className="rounded hover:bg-gray-600 hover:cursor-pointer 
    bg-gray-800 text-gray-200 p-2 font-bold text-sm" onClick={() => setOpen(o => !o)}>Claim Rewards</div>} 
    closeOnDocumentClick={true} closeOnEscape={true}
    onClose={closeModal} open={open}><RewardsView /></Popup>
}