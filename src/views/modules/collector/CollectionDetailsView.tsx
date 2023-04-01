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
    target="_blank"><img className="mr-3" src={img} style={{maxHeight:"260px",maxWidth:"260px",display:"block"}}  
    placeholder={placeholder}/></a> :
    <img src={placeholder} className="mr-3" style={{maxHeight:"260px",maxWidth:"260px",display:"block"}} 
    placeholder={placeholder}/>;


    return <div className="pl-20 text-left pt-2">
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
            <button className="rounded-3xl bg-green-900 font-bold p-2 text-gray-200 w-64">
                Mint NFT
            </button>
        </div>
        
    </div>
}