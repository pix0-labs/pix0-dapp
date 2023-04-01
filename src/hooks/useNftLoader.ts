import { useCallback, useState, useEffect } from "react";
import { Nft } from 'pix0-js';
import useCollectionContract from "pix0-react";

export function useNftLoader (tokenId : string) {

    const [token, setToken] = useState<Nft>();

    const [loading, setLoading] = useState(false);

    const {getNftTokenInfo} = useCollectionContract();

    const fetchToken = useCallback(async ()=>{

        setLoading(true);
        let tk = await getNftTokenInfo(tokenId);
        setToken(tk);
        setLoading(false);
    },[tokenId]);

    useEffect(()=>{
        fetchToken();
    },[fetchToken]);

    return {token,fetchToken,loading};
} 
