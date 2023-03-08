import { FC, useEffect, useCallback, useState } from "react";
import useCollectionContract from "pix0-react2-arch-test";
import { Collection } from "pix0-js-arch-test";
import { Loader} from 'pix0-react2-arch-test';
import { CollectionRow } from "./CollectionRow";
import { CommonMessageDiv } from "../CommonMessageDiv";

export const CollectionsListView : FC = () =>{

    const {getCollections} = useCollectionContract();

    const [collections, setCollections] = useState<Collection[]>();

    const fetchCollections = useCallback(async ()=>{
        let c = await getCollections();
        setCollections(c);
    },[]);

    useEffect(()=>{
        fetchCollections();
    },[]);

    return <div className="w-10/2 p-2 overflow-x-auto">
    <table className="table-auto w-10/12">
        <thead>
        <tr className="bg-gray-700">    
        <th className="px-4 py-2 text-left">Name</th>
        <th className="px-4 py-2">Symbol</th>
        <th className="px-4 py-2">Description</th>
        <th className="px-4 py-2">Number Of Items</th>
        <th className="px-4 py-2">Status</th>
        <th className="px-4 py-2">Action</th>
        </tr>
        </thead>
        <tbody>
        {
            collections === undefined ?

            <Loader/>

            :

            collections.length > 0 
            ?
            collections.map((c,i)=>{
                return <CollectionRow collection={c} key={`col_${i}`}/>
            })

            : <CommonMessageDiv>No collection found, create one!</CommonMessageDiv>
        }
        </tbody>
    </table></div>
}
