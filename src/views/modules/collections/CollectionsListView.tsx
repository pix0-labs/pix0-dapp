import { FC, useEffect, useCallback, useState } from "react";
import useCollectionContract from "pix0-react2-arch-test";
import { Collection } from "pix0-js-arch-test";
import { PulseLoader} from 'react-spinners';
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

    const refreshCollection = async () =>{
        let c = await getCollections();
        setCollections(c);
      
    }


    const setTxHashOrError = (txHash? : string|Error) => {

        if (txHash){
            setTxHash(txHash);
            if (txHash instanceof Error)
                unsetTxHash();
        }
    }

    useEffect(()=>{
        fetchCollections();
    },[]);

    return <CommonAnimatedDiv className="text-center"><div className="w-10/2 p-2 overflow-x-auto">
    {txHash && <TxHashDiv txHash={txHash}/>}
   
        {
            collections === undefined ?

            <div className="text-left">   
                <PulseLoader color="#eee" margin={2}/>
            </div>
            :

            collections.length > 0 
            ?
            <table style={{width:"88%"}} className="table-auto mr-2 border-collapse border rounded-2xl overflow-hidden">
            <thead>
            <tr className="bg-gray-700">  
            <td className="px-4 py-2 text-center">No</td>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2">Symbol</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2">No Of Items</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2 text-center">Action</th>
            </tr>
            </thead>
            <tbody>{
            collections.map((c,i)=>{
                return <CollectionRow collection={c} key={`col_${i}`} setViewType={setViewType} 
                refreshCollection={refreshCollection} setTxHashOrError={setTxHashOrError} index={i}/>
            })}
            </tbody>
            </table>
            : 
            <div>   
                <CommonMessageDiv>No collection found, add one!</CommonMessageDiv>
            </div>
        }
        </div></CommonAnimatedDiv>
}
