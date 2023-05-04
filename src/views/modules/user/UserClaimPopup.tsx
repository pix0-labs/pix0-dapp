import { FC , ReactElement} from "react";
import Popup from "reactjs-popup";
import { RewardsView } from "./RewardsView";
import "../../css/SModal.css";

type props = {

    trigger: ReactElement,
}


export const UserClaimPopup : FC <props>  = ({
    trigger
}) =>{
    return <Popup modal contentStyle={{maxWidth:"480px",background:"transparent"}} 
    trigger={trigger}
    closeOnEscape={true}><RewardsView/></Popup>
}