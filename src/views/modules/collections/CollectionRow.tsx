import { FC , useCallback, useEffect, useState} from "react";
import { Collection } from "pix0-js-arch-test";
import { statusText } from "./CollectionsListView";
import { AiOutlineMore} from 'react-icons/ai';
import useCollectionContract from "pix0-react2-arch-test";
import {FiPlusCircle,FiTrash,FiEdit, FiTool,FiFolder} from 'react-icons/fi';
import { Popup} from 'reactjs-popup';
import { ViewType } from "./CollectionsView";
import 'reactjs-popup/dist/index.css';


type props = {

    collection : Collection,

    index? : number, 

    setViewType?: (viewType: ViewType, param? : any) => void,

    refreshCollection? : () => void, 

    setTxHashOrError? : (txHash? : string|Error) => void, 

}

export const CollectionRow : FC <props> = ({
    collection, setViewType, refreshCollection, setTxHashOrError, index 
}) =>{

    const {getItemsCount, removeCollection, updateCollection} = useCollectionContract();

    const [itemsCount, setItemsCount] = useState(0);

    const fetchItemsCount = useCallback(async () =>{
        let cnt = await getItemsCount(collection.name, collection.symbol);
        setItemsCount(cnt);
    },[collection]);

    const removeCollectionNow = async () =>{

        if (collection.status === 1){

            if (setTxHashOrError) {
                setTxHashOrError(new Error("Active collection cannot be removed!"));
                return ;
            }
        }

        if ( window.confirm('Are you sure you want to delete the selected collection?')){
            let tx = await removeCollection(collection.name, collection.symbol);
            if ( refreshCollection ){
                refreshCollection();
            }
            if (setTxHashOrError) {
                setTxHashOrError(tx);
            }
        }
    }

    useEffect(()=>{
        fetchItemsCount();
    },[fetchItemsCount]);


    const collectionActionText = (status : number) : string =>{

        if ( status === 0 || status === 2){
            return "Activate Collection";
        }
        else {

            return "Deactivate Collection";
        }
    }


    const updateCollectionStatus = async () =>{

        if ( collection.status === 0 || collection.status === 2){
            
            let tx = await updateCollection({
                name : collection.name,
                symbol : collection.symbol,
                status : 1, 
            });

            if ( refreshCollection ){
                refreshCollection();
            }
            if (setTxHashOrError) {
                setTxHashOrError(tx);
            }
            
        }
        else {
            let tx = await updateCollection({
                name : collection.name,
                symbol : collection.symbol,
                status : 2, 
            });

            if ( refreshCollection ){
                refreshCollection();
            }
            if (setTxHashOrError) {
                setTxHashOrError(tx);
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
                setViewType(ViewType.EDIT, collection);
            }
        }}
        ><FiEdit className="mr-2 inline mb-1"/>Edit Collection</div>
        <div className="rounded hover:bg-gray-600 hover:cursor-pointer 
        bg-gray-800 text-gray-200 p-2" onClick={async (e)=>{
            e.preventDefault();
            await updateCollectionStatus();
        }}><FiTool className="mr-2 inline mb-1"/>
        {collectionActionText(collection.status ?? 0)}
        </div>
        
        <div className="rounded hover:bg-gray-600 hover:cursor-pointer 
        bg-gray-800 text-gray-200 p-2" onClick={async (e)=>{
            e.preventDefault();
            await removeCollectionNow();
        }}><FiTrash className="mr-2 inline mb-1"/>Remove Collection?</div>

        <div className="rounded hover:bg-gray-600 hover:cursor-pointer 
        bg-gray-800 text-gray-200 p-2" onClick={(e)=>{
            e.preventDefault();
            if ( setViewType )
            {
                setViewType(ViewType.ADD_ITEM, collection);
            }
        }}
        ><FiPlusCircle className="mr-2 inline mb-1"/>Add Item</div>

        { (itemsCount > 0) && <div className="rounded hover:bg-gray-600 hover:cursor-pointer 
        bg-gray-800 text-gray-200 p-2" onClick={(e)=>{
            e.preventDefault();
            if ( setViewType )
            {
                setViewType(ViewType.ITEMS_LIST, collection);
            }
        }}
        ><FiFolder className="mr-2 inline mb-1"/>Manage Items</div>}
  </Popup>


    return <tr className="bg-gray-800 hover:bg-gray-900 hover:cursor-pointer border-b border-gray-500">
        <td className="px-4 py-2 text-center">{((index ?? 0) +1)}</td>
        <td className="px-4 py-2 text-left">{collection.name}</td>
        <td className="px-4 py-2">{collection.symbol}</td>
        <td className="px-4 py-2 text-left truncate">{collection.description}</td>
        <td className="px-4 py-2">{itemsCount}</td>
        <td className="px-4 py-2">{statusText(collection.status ?? 0)}</td>
        <td className="px-4 py-2 text-center">
        {menu}
        </td>
    </tr>
}