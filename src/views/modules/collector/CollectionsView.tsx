import { FC, useCallback, useEffect, useState } from "react";
import useCollectionContract from "pix0-react";
import { CollectionsWithParamsResponse} from 'pix0-js';
import { PulseLoader as Loader } from "react-spinners";
import { CollectionView } from "./CollectionView";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { CommonMessageDiv } from "../../components/CommonMessageDiv";
import { Collection } from "pix0-js";

export type CProps = {

    toCollectionDetails?: (collection : Collection) =>void, 

    backToList? : () => void, 
}

export const CollectionsView : FC <CProps> = ({
    toCollectionDetails
}) =>{

    const {getActiveCollections} = useCollectionContract();

    const [collResponse, setCollResponse] = useState<CollectionsWithParamsResponse>();

    const[loading, setLoading] = useState(false);

    const fetchCollections = useCallback (async () =>{
        setLoading(true);
        let res = await getActiveCollections({}); 
        setCollResponse(res);
        setLoading(false);
     }, []);
 

     useEffect(()=>{
         fetchCollections();
     },[fetchCollections]);

    return <CommonAnimatedDiv className="w-full p-2 text-center mx-auto">
    {
    loading ? <div className="text-left p-2"><Loader color="#eee"/></div>
    :
    (collResponse?.collections?.length ?? 0) > 0 ?
    
    <div className="table-responsive pr-4">
       <table className="text-left w-full mt-4 mr-4" cellPadding={5} cellSpacing={3}>
        <thead>
            <tr className="bg-gray-800">
                <th className="sticky top-0" style={{width:"5%"}}>No.</th>
                <th className="sticky top-0" style={{width:"35%"}} colSpan={2}>Collection</th>
                <th className="sticky top-0" style={{width:"20%"}}>Creator</th>
                <th className="sticky top-0 text-center" style={{width:"20%"}}>Available Items</th>
                <th className="sticky top-0" style={{width:"10%"}}>&nbsp;</th>
            </tr>
        </thead>
        <tbody>
        {
            collResponse?.collections?.map((c, _i)=>{
                return <CollectionView key={`Collection_${_i}`} collection={c} index={_i} 
                toCollectionDetails={toCollectionDetails}/>
            })
        }</tbody>
    </table>
    </div>
    : <CommonMessageDiv>NO Active collections from neighborhood...</CommonMessageDiv>
    }
    </CommonAnimatedDiv>
}