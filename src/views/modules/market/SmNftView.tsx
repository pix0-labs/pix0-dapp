import { FC } from "react";
import { useNftLoader } from "../../../hooks/useNftLoader";
import '../../css/c.css';

type props = {

    tokenId : string, 

    index? : number, 
}

export const SmNftView : FC <props> = ({
    tokenId, index
}) =>{

    const {token} = useNftLoader(tokenId);

    return <div className="cursor-pointer bg-gray-700 hover:bg-gray-900 rounded-md 
    text-center py-2 mt-8 ml-4 mr-4 shadow-3xl min-h-200 IndDiv text-gray-100">
        <div className="pl-4 mt-2 mb-4 truncate font-bold bg-gray-800 p-2 text-left">
        {`${(index ?? 0) + 1}.`} {token?.extension.name}</div>
        <div className="m-2 pl-2">
        <img style={{maxWidth:"200px"}} src={token?.extension.image}/></div>
    </div>
}