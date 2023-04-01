import { FC } from "react";
import useCollectionRandomImg from "../../../hooks/useCollectionRandomImg";
import { useCollectionInfo } from "../../../hooks/useCollectionInfo";
import { shortenStringTo } from "pix0-react";
import { Collection} from 'pix0-js';
import { CProps } from "./CollectionsView";
import { FcNext } from "react-icons/fc";
import placeholder from '../../../images/placeholder2.png';



type props = CProps & {

    collection : Collection, 

    index? : number, 
}

export const CollectionView : FC <props> = ({
    collection, index, toCollectionDetails 
}) =>{

    const {img} = useCollectionRandomImg(collection);

    const {itemsCount} = useCollectionInfo(collection);


    const imgView = img ? <a href={img}
    target="_blank"><img className="mr-3" src={img} style={{height:"40px",width:"40px",display:"inline-block"}}  
    placeholder={placeholder}/></a> :
    <img src={placeholder} className="mr-3" style={{height:"40px",width:"40px",display:"inline-block"}} placeholder={placeholder}/>;

    return <tr className="border-b border-slate-600 hover:bg-gray-700 p-2 cursor-pointer"
    onClick={()=>{
        if (toCollectionDetails) {
            toCollectionDetails(collection);
        }
    }}>
        <td className="block sm:table-cell">{(index ?? 0)+1}</td>
        <td className="block sm:table-cell text-left">{imgView}
        <span className="font-bold text-sm">{collection.symbol}</span>
        </td>
        <td className="ml-2 text-overflow:ellipsis text-left">{collection.name}</td>
        <td className="block sm:table-cell text-left">{shortenStringTo(collection.owner ?? "", 8)}</td>
        <td className="ml-2 text-center">{itemsCount}</td>
        <td className="block sm:table-cell"><FcNext style={{width:"30px",height:"30px"}}/></td>
    </tr>
}