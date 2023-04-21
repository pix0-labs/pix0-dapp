import { FC , ReactElement, useState} from "react";
import Popup from "reactjs-popup";
import { UserIconView} from '../../components/UserIconView';
import { NFTsSelector, NProps } from "./NFTsSelector";
import "../../css/Modal.css";

type props = NProps & {

    trigger? : ReactElement

}

export const NFTsSelPopup : FC <props> = ({
    trigger, selectNft, selectedTokenId
}) =>{

    const [chosenImageUrl, setChosenImageUrl] = useState<string>();

    return <Popup modal nested trigger={trigger ?? <button>
    <UserIconView style={{width:"100px", height:"100px"}} chosenImageUrl={chosenImageUrl}
    className="bg-gray-500 rounded-3xl p-2 cursor-pointer"/></button>}
    closeOnEscape={true}><NFTsSelector selectNft={(tokenId, imageUrl)=>{

        setChosenImageUrl(imageUrl);
        if (selectNft) 
            selectNft(tokenId, imageUrl);

    }} selectedTokenId={selectedTokenId}/></Popup>
}