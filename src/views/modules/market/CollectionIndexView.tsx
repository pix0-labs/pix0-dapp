import { FC } from "react";
import { CollectionIndex} from 'pix0-js';
import placeholder from '../../../images/placeholder2.png';

type props = {

    collectionIndex : CollectionIndex,

    index? : number, 
}

export const CollectionIndexView : FC <props> = ({
    collectionIndex, index 
}) =>{

    return <div className="cursor-pointer bg-gray-700 hover:bg-gray-900 rounded-md 
    text-center py-2 mt-8 ml-4 mr-4 shadow-3xl min-h-200 IndDiv inline-block"
    onClick={()=>{

    }}>
        <div className="pl-4 mt-2 mb-4 text-overflow:ellipsis font-bold bg-gray-800 p-2 text-left">
        {`${(index ?? 0) + 1}.`} {collectionIndex.collection_info?.collection_name}</div>
        <div className="m-2 pl-2">
        <img style={{maxHeight:"180px"}} src={placeholder}/>
        </div>
        
    </div>
}