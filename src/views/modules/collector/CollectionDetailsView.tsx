import { FC } from "react";
import useCollectionRandomImg from "../../../hooks/useCollectionRandomImg";
import { Collection } from "pix0-js";
import { TfiClose} from 'react-icons/tfi';
import placeholder from '../../../images/placeholder2.png';

type props = {

    collection: Collection,

    backToList?: () => void, 
}

export const CollectionDetailsView : FC <props> = ({
    collection, backToList
}) =>{


    const {img} = useCollectionRandomImg(collection);

    const imgView = img ? <a href={img}
    target="_blank"><img className="mx-auto rounded-full" src={img} style={{height:"200px",width:"200px",display:"block"}}  
    placeholder={placeholder}/></a> :
    <img src={placeholder} className="mx-auto rounded-full" style={{height:"200px",width:"200px",display:"block"}} 
    placeholder={placeholder}/>;

    return <div className="w-4/5 text-left pt-2 bg-gray-900 text-center rounded-3xl p-4 mt-4 ml-2">
        <div className="p-2 rounded-3xl bg-gray-700 text-gray-200 mb-10">
            {collection.name} {backToList && <button className="float-right"
            onClick={(e)=>{
                e.preventDefault();
                backToList();
            }}><TfiClose className="mr-4"/></button>}
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