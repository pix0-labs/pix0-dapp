import { FC , ReactElement} from "react";
import Popup from "reactjs-popup";
import { UserIconView} from '../../components/UserIconView';
import { NFTsSelector, NProps } from "./NFTsSelector";
import "../../css/Modal.css";

type props = NProps & {

    trigger? : ReactElement

}

export const NFTsSelPopup : FC <props> = ({
    trigger, selectNft
}) =>{
    return <Popup modal nested trigger={trigger ?? <button><UserIconView style={{width:"100px", height:"100px"}}
    className="bg-gray-500 rounded-3xl p-2 cursor-pointer"/></button>}
    closeOnEscape={true}><NFTsSelector selectNft={selectNft}/></Popup>
}