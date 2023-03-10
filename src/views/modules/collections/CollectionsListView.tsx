import { FC, useEffect, useCallback, useState } from "react";
import useCollectionContract from "pix0-react2-arch-test";
import { Collection } from "pix0-js-arch-test";
import { Loader} from 'pix0-react2-arch-test';
import { TxHashDiv } from "../../components/TxHashDiv";
import { CollectionRow } from "./CollectionRow";
import { CommonMessageDiv } from "../../components/CommonMessageDiv";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { ViewType } from "./CollectionsView";

export const statusText = ( status : number) : string =>{

    switch(+status){

        case 0 :

            return "Draft";

        case 1 :

            return "Active";

        case 2 :

            return "Deactivated";

        default :

            return "Draft";
    }
}

type props = {

    setViewType?: (viewType: ViewType, param? : any) => void,
}

export const CollectionsListView : FC <props> = ({
    setViewType
}) =>{

    const {getCollections} = useCollectionContract();

    const [collections, setCollections] = useState<Collection[]>();

    const [txHash, setTxHash] = useState<string|Error>();

    const fetchCollections = useCallback(async ()=>{
        await refreshCollection();
    },[]);

    const unsetTxHash = () =>{

        setTimeout(()=>{
            setTxHash(undefined);
        },10000);
    }

    const refreshCollection = async (txHash? : string|Error) =>{
        let c = await getCollections();
        setCollections(c);
        if (txHash){
            setTxHash(txHash);
            unsetTxHash();
        }
    }

    useEffect(()=>{
        fetchCollections();
    },[]);

    return <CommonAnimatedDiv className="text-center"><div className="w-10/2 p-2 overflow-x-auto">
    {txHash && <TxHashDiv txHash={txHash}/>}
    <table className="table-auto w-10/12 mr-2 border-collapse border rounded-2xl overflow-hidden">
        <thead>
        <tr className="bg-gray-700">    
        <th className="px-4 py-2 text-left">Name</th>
        <th className="px-4 py-2">Symbol</th>
        <th className="px-4 py-2">Description</th>
        <th className="px-4 py-2">Number Of Items</th>
        <th className="px-4 py-2">Status</th>
        <th className="px-4 py-2 text-center">Action</th>
        </tr>
        </thead>
        <tbody>
        {
            collections === undefined ?

            <tr>
                <td colSpan={6} className="text-center">
                    <Loader/>
                </td>
            </tr>
            :

            collections.length > 0 
            ?
            collections.map((c,i)=>{
                return <CollectionRow collection={c} key={`col_${i}`} setViewType={setViewType} 
                refreshCollection={refreshCollection}/>
            })

            : 
            <tr>
                <td colSpan={6} className="text-center">
                <CommonMessageDiv>No collection found, add one!</CommonMessageDiv>
                </td>
            </tr>
        }
        </tbody>
    </table></div></CommonAnimatedDiv>
}
