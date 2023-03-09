import { FC } from "react";
import { Collection } from "pix0-js-arch-test";
import { statusText } from "./CollectionsListView";
import { AiOutlineMore} from 'react-icons/ai';
import {FiPlusCircle,FiTrash,FiEdit} from 'react-icons/fi';
import { Popup} from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

type props = {

    collection : Collection,

}

export const CollectionRow : FC <props> = ({
    collection
}) =>{

    const menu =  <Popup contentStyle={{background:"#222",minWidth:"240px"}} 
    arrowStyle={{color:"#222", border:"1px"}}
    className="bg-gray-900 text-gray-300 w-64 p-4 m-4"
    trigger={<button className="bg-gray-600 hover:bg-cyan-900 rounded-3xl p-2">
    <AiOutlineMore/></button>} position="left center">
        <div className="rounded hover:bg-gray-600 hover:cursor-pointer 
        bg-gray-800 text-gray-200 p-2"><FiEdit className="mr-2 inline mb-1"/>Edit Collection</div>
        <div className="rounded hover:bg-gray-600 hover:cursor-pointer 
        bg-gray-800 text-gray-200 p-2"><FiTrash className="mr-2 inline mb-1"/>Remove Collection?</div>
        <div className="rounded hover:bg-gray-600 hover:cursor-pointer 
        bg-gray-800 text-gray-200 p-2"><FiPlusCircle className="mr-2 inline mb-1"/>Add Items</div>
  </Popup>


    return <tr className="bg-gray-800 hover:bg-gray-900 hover:cursor-pointer">
        <td className="px-4 py-2 text-left">{collection.name}</td>
        <td className="px-4 py-2">{collection.symbol}</td>
        <td className="px-4 py-2">{collection.description}</td>
        <td className="px-4 py-2">{"0"}</td>
        <td className="px-4 py-2">{statusText(collection.status ?? 0)}</td>
        <td className="px-4 py-2 text-center">
        {menu}
        </td>
    </tr>
}