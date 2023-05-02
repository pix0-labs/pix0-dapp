import { FC , ReactElement} from "react";
import Popup from "reactjs-popup";
import { UserView,props as uprops} from "./UserView";
import { SmUserView } from "../../components/SmUserView";
import "../../css/SModal.css";

type props = uprops & {

    trigger? : ReactElement
    
    flat? : boolean,

    smUserViewClassName? : string, 

    smUserViewPrefix? : string, 
}

export const UserViewPopup : FC <props> = ({
    trigger, address, flat, smUserViewClassName, smUserViewPrefix
}) =>{
    return <Popup modal contentStyle={{maxWidth:"320px",background:"transparent"}} 
    trigger={trigger ?? <button className="bg-transparent w-5/12"><SmUserView address={address}
    className={ smUserViewClassName ?? "p-2 bg-slate-700 rounded w-3/12 mx-auto"} flat={flat} 
    prefix={smUserViewPrefix} /></button>}
    closeOnEscape={true}><UserView address={address}/></Popup>
}