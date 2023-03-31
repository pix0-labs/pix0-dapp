import { FC, useEffect, useCallback, useState } from "react";
import {Collection, randomNumber, LINK_TYPE_IMAGE_URL} from 'pix0-js';
import useCollectionContract from "pix0-react";
import { shortenStringTo } from "pix0-react";
import { FcNext } from "react-icons/fc";
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
    target="_blank"><img className="mr-3" src={img} style={{height:"40px",width:"40px",display:"inline-block"}}  
    placeholder={placeholder}/></a> :
    <img src={placeholder} className="mr-3" style={{height:"40px",width:"40px",display:"inline-block"}} placeholder={placeholder}/>;

    return <tr className="border-b border-slate-600 hover:bg-gray-700 p-2">
        <td className="block sm:table-cell">{(index ?? 0)+1}</td>
        <td className="block sm:table-cell text-left font-bold">{imgView}{collection.symbol}</td>
        <td className="block sm:table-cell text-overflow:ellipsis text-left">{collection.name}</td>
        <td className="block sm:table-cell text-left">{shortenStringTo(collection.owner ?? "", 8)}</td>
        <td className="block sm:table-cell"><FcNext style={{width:"30px",height:"30px"}}/></td>
    </tr>
}