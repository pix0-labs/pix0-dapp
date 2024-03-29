import { FC, useEffect, useCallback, useState } from "react";
import useCollectionContract from "pix0-react";
import { Item } from "pix0-js";
import { PulseLoader} from 'react-spinners';
import { TxHashDiv } from "../../components/TxHashDiv";
import { ItemRow } from "./ItemRow";
import { CommonMessageDiv } from "../../components/CommonMessageDiv";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { ViewType } from "./CollectionsView";


type props = {

    setViewType?: (viewType: ViewType, param? : any) => void,

    collection_name : string,

    collection_symbol : string, 
}

export const ItemsListView : FC <props> = ({
    setViewType, collection_name, collection_symbol
}) =>{

    const {getItems} = useCollectionContract();

    const [items, setItems] = useState<Item[]>();

    const [txHash, setTxHash] = useState<string|Error>();

    const fetchItems = useCallback(async ()=>{
        await refreshItem();
    },[]);

    const unsetTxHash = () =>{

        setTimeout(()=>{
            setTxHash(undefined);
        },10000);
    }

    const refreshItem = async () =>{
        let c = await getItems(collection_name, collection_symbol);
        setItems(c);
    }


    const setTxHashOrError = (txHash? : string|Error) => {

        if (txHash){
            setTxHash(txHash);
            if (txHash instanceof Error)
                unsetTxHash();
        }
    }

    useEffect(()=>{
        fetchItems();
    },[]);

    return <CommonAnimatedDiv className="text-center"><div className="w-full overflow-x-hidden">
    {txHash && <TxHashDiv txHash={txHash}/>}
   
        {
            items === undefined ?

            <div className="text-left">   
                <PulseLoader color="#eee" margin={2}/>
            </div>
            :

            items.length > 0 
            ?
            <>
            <table style={{width:"100%"}} className="table-auto mr-2 border-collapse border rounded overflow-hidden">
            <thead>
            <tr className="bg-gray-700">    
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-center">Action</th>
            </tr>
            </thead>
            <tbody>{
            items.map((c,i)=>{
                return <ItemRow item={c} key={`col_${i}`} index={i} setViewType={setViewType} 
                refreshItem={refreshItem} setTxHashOrError={setTxHashOrError}/>
            })}
            </tbody>
            </table></>
            : 
            <div>   
                <CommonMessageDiv>No item found, add one!</CommonMessageDiv>
            </div>
        }
        </div></CommonAnimatedDiv>
}
