import { FC, useCallback, useEffect, useState } from "react";
import useCollectionContract from "pix0-react";
import  {Nft} from 'pix0-js';

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

    return <div style={{maxWidth:"220px"}} className="bg-gray-700 hover:bg-stone-800 rounded-2xl 
    text-left w-11/12 sm:w-1/3 lg:w-1/4 px-2 py-2 mt-4 mr-2 shadow-3xl min-h-200">
        <div className="m-2 text-overflow:ellipsis">{`${(index ?? 0) + 1}.`} {token?.extension.name}</div>
        <div className="m-2"><a href={token?.extension.image}
        target="_blank"><img src={token?.extension.image} style={{maxWidth:"190px"}}/></a></div>
        <div className="m-2 text-overflow:ellipsis">{token?.extension.description}</div>
    </div>
}