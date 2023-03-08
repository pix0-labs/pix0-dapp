import { FC, useEffect, useCallback, useState } from "react";
import useCollectionContract from "pix0-react2-arch-test";
import { Collection } from "pix0-js-arch-test";
import { Loader} from 'pix0-react2-arch-test';
import { CollectionRow } from "./CollectionRow";
import { CommonMessageDiv } from "../../CommonMessageDiv";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";

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

    return <CommonAnimatedDiv className="text-center"><div className="w-10/2 p-2 overflow-x-auto">
    <table className="table-auto w-10/12 mr-2 border-collapse border rounded-2xl overflow-hidden">
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

            <tr>
                <td colSpan={6} className="text-center">
                    <Loader/>
                </td>
            </tr>
            :

            collections.length > 0 
            ?
            collections.map((c,i)=>{
                return <CollectionRow collection={c} key={`col_${i}`}/>
            })

            : 
            <tr>
                <td colSpan={6} className="text-center">
                <CommonMessageDiv>No collection found, create one!</CommonMessageDiv>
                </td>
            </tr>
        }
        </tbody>
    </table></div></CommonAnimatedDiv>
}
