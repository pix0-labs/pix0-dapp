import { FC } from "react";
import { Item } from "pix0-js-arch-test";
import { AiOutlineMore} from 'react-icons/ai';
import {FiTrash,FiEdit} from 'react-icons/fi';
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
    item, setViewType, refreshItem, setTxHashOrError, index 
}) =>{

 
    const removeItemNow = async () =>{

        if ( window.confirm('Are you sure you want to delete the selected item?')){
       
            if ( refreshItem ){
                refreshItem();
            }
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
            if ( setViewType )
            {
                setViewType(ViewType.EDIT, item);
            }
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
        <td className="px-4 py-2 text-left"><img src={
            item.links.filter(i=> {return i.link_type ===1} )[0].value
        } style={{maxWidth:"36px"}}/></td>
        <td className="px-4 py-2 text-left">{item.name}</td>
        <td className="px-4 py-2 text-left">{item.description}</td>
        <td className="px-4 py-2 text-center">
        {menu}
        </td>
    </tr>
}