import { FC } from "react";
import { Item } from "pix0-js";
import { AiOutlineMore} from 'react-icons/ai';
import {FiTrash,FiEdit} from 'react-icons/fi';
import { ImageWithPopupView } from "../../components/ImageWithPopupView";
//import useCollectionContract from "pix0-react";
import { Popup} from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { ViewType } from "./CollectionsView";

type props = {

    item : Item,

    index? : number,

    setViewType?: (viewType: ViewType, param? : any) => void,

    refreshItem? : () => void, 

    setTxHashOrError? : (txHash? : string|Error) => void, 

}

export const ItemRow : FC <props> = ({
    item, setViewType, refreshItem, index 
}) =>{


    const removeItemNow = async () =>{

        if ( window.confirm('Are you sure you want to delete the selected item?')){
       
            if ( refreshItem ){
                refreshItem();
            }
            window.alert("Feature coming soon...");
            
        }
    }

    
    const menu =  <Popup contentStyle={{background:"#222",minWidth:"240px"}} 
    arrowStyle={{color:"#222", border:"1px"}}
    className="bg-gray-900 text-gray-300 w-64 p-4 m-4"
    trigger={<button className="bg-gray-600 hover:bg-cyan-900 rounded-3xl p-2">
    <AiOutlineMore/></button>} position="left center">
        <div className="rounded hover:bg-gray-600 hover:cursor-pointer 
        bg-gray-800 text-gray-200 p-2"
        onClick={(e)=>{
            e.preventDefault();
            window.alert("Feature coming soon...");
        }}
        ><FiEdit className="mr-2 inline mb-1"/>Edit Item</div>
        <div className="rounded hover:bg-gray-600 hover:cursor-pointer 
        bg-gray-800 text-gray-200 p-2" onClick={async (e)=>{
            e.preventDefault();
            await removeItemNow();
        }}><FiTrash className="mr-2 inline mb-1"/>Remove Item?</div>

  </Popup>


    return <tr className="bg-gray-800 hover:bg-gray-900 hover:cursor-pointer border-b border-gray-500">
        <td className="px-4 py-2 text-center">{((index ?? 0) +1)}</td>
        <td className="px-4 py-2 text-left"><ImageWithPopupView src={
            item.links.filter(i=> {return i.link_type ===1} )[0].value
        } arrowPosition="right center" on={"hover"}/></td>
        <td className="px-4 py-2 text-left">{item.name}</td>
        <td className="px-4 py-2 text-left">{item.description}</td>
        <td className="px-4 py-2 text-center">
        {menu}
        </td>
    </tr>
}