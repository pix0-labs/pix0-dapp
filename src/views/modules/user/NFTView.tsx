import { FC } from "react";
import { useNftLoader } from "../../../hooks/useNftLoader";
import { NProps } from "./NFTsSelector";
import { FcCheckmark } from "react-icons/fc";
import '../../css/c.css';

type props = NProps & {

    tokenId : string, 

    index? : number, 
}

export const NFTView : FC <props> = ({
    tokenId, index, selectNft, selectedTokenId
}) =>{

    const {token} = useNftLoader(tokenId);

    return <div className={`cursor-pointer 
    ${selectedTokenId === tokenId  ? "bg-slate-600" : "bg-gray-700 hover:bg-gray-900"} rounded-md 
    text-center py-2 mt-8 ml-4 mr-4 shadow-3xl min-h-200 IndDiv`}
    onClick={()=>{
        if ( selectNft){
            selectNft(tokenId,token?.extension.image);
        }
    }}>
        <div className="m-2 pl-2"><img style={{maxWidth:"200px"}} src={token?.extension.image}/></div>
        <div className="pl-4 mt-2 mb-4 truncate font-bold bg-gray-800 p-2 text-left text-gray-100">
        {`${(index ?? 0) + 1}.`} {token?.extension.name}</div>
        {selectedTokenId === tokenId && <FcCheckmark className="float-right w-4 h-4 mr-2"/>}
    </div>
}