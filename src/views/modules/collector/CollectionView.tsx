import { FC, useEffect, useCallback, useState } from "react";
import {Collection, randomNumber, LINK_TYPE_IMAGE_URL} from 'pix0-js';
import useCollectionContract from "pix0-react";
import placeholder from '../../../images/placeholder2.png';

type props = {

    collection : Collection, 

    index? : number, 
}

export const CollectionView : FC <props> = ({
    collection, index 
}) =>{

    const {getItems} = useCollectionContract();

    const [img, setImg] = useState<string>();

    const fetchRandomImage = useCallback(async ()=>{

        let items = await getItems(collection.name, collection.symbol, collection.owner);
        let idx = randomNumber(0, items.length -1 );
        let image = items[idx].links.filter(l => {return l.link_type === LINK_TYPE_IMAGE_URL})[0]?.value;
        setImg(image);

    },[]);

    useEffect(()=>{
        fetchRandomImage();
    },[fetchRandomImage]);


    const imgView = img ? <a href={img}
    target="_blank"><img src={img} style={{maxWidth:"190px"}} placeholder={placeholder}/></a> :
    <img src={placeholder} style={{maxWidth:"190px"}} placeholder={placeholder}/>;

    return <div style={{maxWidth:"220px"}} className="bg-gray-700 hover:bg-stone-800 rounded-2xl 
    text-left w-11/12 sm:w-1/3 lg:w-1/4 px-2 py-2 mt-4 mr-6 shadow-3xl min-h-200">
        <div className="m-2 text-overflow:ellipsis">{`${(index ?? 0) + 1}.`} {collection.name}</div>
        <div className="m-2">{imgView}</div>
        <div className="m-2 text-overflow:ellipsis">{collection.description}</div>
    </div>
}