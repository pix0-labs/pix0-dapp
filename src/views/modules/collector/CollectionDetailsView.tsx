import { FC } from "react";
import useCollectionRandomImg from "../../../hooks/useCollectionRandomImg";
import { Collection } from "pix0-js";
import placeholder from '../../../images/placeholder2.png';

type props = {

    collection: Collection,
}

export const CollectionDetailsView : FC <props> = ({
    collection
}) =>{


    const {img} = useCollectionRandomImg(collection);

    const imgView = img ? <a href={img}
    target="_blank"><img className="mr-3" src={img} style={{height:"160px",width:"160px",display:"inline-block"}}  
    placeholder={placeholder}/></a> :
    <img src={placeholder} className="mr-3" style={{height:"160px",width:"160px",display:"inline-block"}} 
    placeholder={placeholder}/>;


    return <div className="p-2">
        <div className="p-2 rounded-2xl bg-gray-700 text-gray-200 mb-2">
            {collection.name}
        </div>
        <div>
            {imgView}
        </div>

        {collection.description && 
        <div className="p-2 rounded-2xl bg-gray-700 text-gray-200 mb-2">
            {collection.description}
        </div>}
       
        <div className="p-2 mb-2">
            <button className="rounded-3xl bg-green-300 p-2 text-gray-200">
                Mint NFT
            </button>
        </div>
        
    </div>
}