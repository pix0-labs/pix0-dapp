import { FC} from "react";
import { BuyOffer, toCoinStr} from 'pix0-js';
import { CProps } from "./BuyOffersListView";
import { SmUserView } from "../../components/SmUserView";
import { timestampToTimeAgo } from "pix0-react";
import { AcceptBuyOfferPopup } from "./AcceptBuyOfferPopup";
import { isConnectedWallet } from "../../../utils";
import { useMarketContract } from "pix0-react";
import { Popup} from 'reactjs-popup';
import { AiOutlineMore } from "react-icons/ai";
import { FiEdit, FiTrash } from "react-icons/fi";
import '../../css/SmallImg.css';

type props = CProps & {

    offer : BuyOffer, 

    index? : number, 

    setTxHash? :(tx : string|Error) => void,
    
    setProcessing? : (processing : boolean) => void, 
}

export const BuyOfferRowView : FC <props> = ({
    offer, index, toBuyOfferDetails, forConnectedWallet, withAcceptButton,
    setTxHash, setProcessing
}) =>{

    const {cancelBuyOffer} = useMarketContract();

    const cancelBuyOfferNow = async () =>{

        if( setProcessing ){
            setProcessing(true);
        }

        let tx = await cancelBuyOffer(offer.sell_offer_id);

        if ( setTxHash){
            setTxHash(tx);
        }

        if( setProcessing ){
            setProcessing(false);
        }
    }


    const menu =  <Popup contentStyle={{background:"#222",minWidth:"240px"}} 
    arrowStyle={{color:"#222", border:"1px"}}
    className="bg-gray-900 text-gray-300 w-64 p-4 m-4"
    trigger={<button className="bg-gray-600 hover:bg-cyan-900 rounded-3xl p-2">
    <AiOutlineMore/></button>} position="left center">
     
        <div className="rounded hover:bg-gray-600 hover:cursor-pointer 
        bg-gray-800 text-gray-200 p-2" onClick={async (e)=>{
            e.preventDefault();
            await cancelBuyOfferNow();
        }}><FiTrash className="mr-2 inline mb-1"/>Cancel Buy Offer?</div>

        <div className="rounded hover:bg-gray-600 hover:cursor-pointer 
        bg-gray-800 text-gray-200 p-2"
        onClick={(e)=>{
            e.preventDefault();
            window.alert("Feature coming soon...");
        }}
        ><FiEdit className="mr-2 inline mb-1"/>Edit Buy Offer</div>
        
    </Popup>
    

    return <tr className="border-b border-slate-600 hover:bg-gray-700 p-2 cursor-pointer"
    onClick={()=>{
        if (toBuyOfferDetails) {
            toBuyOfferDetails(offer);
        }
    }}>
        <td className="block sm:table-cell">{(index ?? 0)+1}</td>
        <td className="block sm:table-cell">{offer.sell_offer_id}</td>
        <td title={`${offer.price.amount}${offer.price.denom}`} className="sticky top-0"   
        style={{width:"20%"}}>{toCoinStr(parseFloat(offer.price.amount),3, offer.price.denom)} CONST</td>
        { !forConnectedWallet && <td className="sticky top-0" 
        style={{width:"30%"}}><SmUserView address={offer.owner}/></td>}
        <td className="sticky top-0" style={{width:"10%"}} 
        title={timestampToTimeAgo( offer.date_created ?? 0).asDate}>{timestampToTimeAgo( offer.date_created ?? 0).short}</td>
        <td className="block sm:table-cell">
        {withAcceptButton ? <AcceptBuyOfferPopup buy_offer={offer}/> : 
        isConnectedWallet(offer.owner) ? menu : <></>}</td>
    </tr>
}