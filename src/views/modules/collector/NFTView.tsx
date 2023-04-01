import { FC, useCallback, useEffect, useState } from "react";
import useCollectionContract from "pix0-react";
import  {Nft} from 'pix0-js';
import '../../css/c.css';

type props = {

    token_id : string, 

    index? : number, 
}

export const NFTView : FC <props> = ({
    token_id, index 
}) =>{

    const [token, setToken] = useState<Nft>();

    const {getNftTokenInfo} = useCollectionContract();

    const fetchToken = useCallback(async ()=>{

        let tk = await getNftTokenInfo(token_id);
        setToken(tk);

    },[token_id]);

    useEffect(()=>{
        fetchToken();
    },[fetchToken]);

    return <div className="bg-gray-700 hover:bg-stone-800 rounded-2xl 
    text-center py-2 mt-4 mr-6 shadow-3xl min-h-200 IndDiv">
        <div className="pl-4 mt-2 mb-4 text-overflow:ellipsis font-bold bg-gray-800 p-2 text-left">
        {`${(index ?? 0) + 1}.`} {token?.extension.name}</div>
        <div className="m-2 pl-2"><a href={token?.extension.image}
        target="_blank"><img style={{maxWidth:"200px"}} src={token?.extension.image}/></a></div>
        <div className="m-2 text-overflow:ellipsis pl-2 text-left">{token?.extension.description}</div>
    </div>
}