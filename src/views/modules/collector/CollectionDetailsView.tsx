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
    target="_blank"><img className="mx-auto" src={img} style={{maxHeight:"260px",maxWidth:"260px",display:"block"}}  
    placeholder={placeholder}/></a> :
    <img src={placeholder} className="mx-auto" style={{maxHeight:"260px",maxWidth:"260px",display:"block"}} 
    placeholder={placeholder}/>;


    return <div className="w-4/5 text-left pt-2 bg-gray-800 text-center rounded-3xl p-4 mt-4">
        <div className="p-2 rounded-2xl bg-gray-700 text-gray-200 mb-10">
            {collection.name}
        </div>
        <div className="mb-10">
            {imgView}
        </div>

        {collection.description && 
        <div className="p-2 rounded-2xl bg-gray-700 text-gray-200 mb-10">
            {collection.description}
        </div>}
       
        <div className="p-2 mb-10">
            <button className="rounded-3xl bg-green-900 font-bold p-2 text-gray-200 w-64">
                Mint NFT
            </button>
        </div>
        
    </div>
}