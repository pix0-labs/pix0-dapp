import { FC } from "react";
import useCollectionRandomImg from "../../../hooks/useCollectionRandomImg";
import { useCollectionInfo } from "../../../hooks/useCollectionInfo";
import { shortenStringTo } from "pix0-react";
import { Collection} from 'pix0-js';
import { CProps } from "./CollectionsView";
import { FcNext } from "react-icons/fc";
import { TokenImageView } from "../../components/TokenImageView";
import '../../css/SmallImg.css';

type props = CProps & {

    collection : Collection, 

    index? : number, 
}

export const CollectionView : FC <props> = ({
    collection, index, toCollectionDetails 
}) =>{

    const {img} = useCollectionRandomImg(collection);

    const {itemsCount} = useCollectionInfo(collection);

    return <tr className="border-b border-slate-600 hover:bg-gray-700 p-2 cursor-pointer"
    onClick={()=>{
        if (toCollectionDetails) {
            toCollectionDetails(collection);
        }
    }}>
        <td className="block sm:table-cell">{(index ?? 0)+1}</td>
        <td className="block sm:table-cell text-left">
        <TokenImageView image={img} className="sm_img_container" style={{width:"30px",height:"30px"}}/>
        <div className="font-bold text-sm float-left mt-2 mr-2">{collection.symbol}</div>    
        </td>
        <td className="ml-2 text-overflow:ellipsis text-left">{collection.name}</td>
        <td className="block sm:table-cell text-left">{shortenStringTo(collection.owner ?? "", 8)}</td>
        <td className="ml-2 text-center">{itemsCount}</td>
        <td className="block sm:table-cell"><FcNext style={{width:"30px",height:"30px"}}/></td>
    </tr>
}