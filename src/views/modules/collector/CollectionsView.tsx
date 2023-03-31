import { FC, useCallback, useEffect, useState } from "react";
import useCollectionContract from "pix0-react";
import { CollectionsWithParamsResponse} from 'pix0-js';
import { PulseLoader as Loader } from "react-spinners";
import { CollectionView } from "./CollectionView";
import { CommonMessageDiv } from "../../components/CommonMessageDiv";

export const CollectionsView : FC = () =>{

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

    return <div className="w-full p-2 text-center mx-auto">
    {
    loading ? <div className="text-left p-2"><Loader color="#eee"/></div>
    :
    (collResponse?.collections?.length ?? 0) > 0 ?
    
    <div>
        <div className="text-left text-gray-200 mb-4 ml-2">Available collections</div>    
        <div className="flex flex-wrap text-center">
        {
            collResponse?.collections?.map((c, _i)=>{
                return <CollectionView key={`Collection_${_i}`} collection={c} index={_i}/>
            })
        }</div>
    </div>
    : <CommonMessageDiv>NO Active collections from neighborhood...</CommonMessageDiv>
    }
    </div>
}