import { FC, useCallback, useEffect, useState } from "react";
import useCollectionContract from "pix0-react2-arch-test";
import  {Nft} from 'pix0-js-arch-test';

type props = {

    token_id : string, 
}

export const NFTView : FC <props> = ({
    token_id
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

    return <div className="bg-gray-700 rounded-2xl text-left p-4 m-4 max-w-200">
        <div className="m-2">{token?.extension.name}</div>
        <div className="m-2"><a href={token?.extension.image}
        target="_blank"><img src={token?.extension.image} style={{maxWidth:"200px"}}/></a></div>
        <div className="m-2">{token?.extension.description}</div>
    </div>
}