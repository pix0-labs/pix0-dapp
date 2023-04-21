import { FC , ReactElement} from "react";
import Popup from "reactjs-popup";
import { UserView,props as uprops} from "./UserView";
import { SmUserView } from "../../components/SmUserView";
import "../../css/SModal.css";

type props = uprops & {

    trigger? : ReactElement
}

export const UserViewPopup : FC <props> = ({
    trigger, address
}) =>{
    return <Popup modal trigger={trigger ?? <button className="bg-transparent w-5/12"><SmUserView address={address}
    className="p-2 bg-slate-700 rounded w-3/12 mx-auto"/></button>}
    closeOnEscape={true}><UserView address={address}/></Popup>
}