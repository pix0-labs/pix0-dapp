import { FC, useState, useCallback, useEffect } from "react";
import useCollectionContract from "pix0-react2-arch-test";
import { Loader} from 'pix0-react2-arch-test';
import { NFTView } from "./NFTView";
import { CommonMessageDiv } from "../CommonMessageDiv";

export const NFTsView : FC = () =>{

    const [tokens, setTokens] = useState<string[]>();

    const {getMintedTokensByOwner} = useCollectionContract();

   
    const fetchTokens = useCallback (async () =>{
        
       let nfts = await getMintedTokensByOwner({});

        setTokens(nfts);
    }, []);


    useEffect(()=>{
        fetchTokens();
    },[fetchTokens]);

    return <div>

    <div className="bg-gray-700 p-2 text-left max-w-300 rounded-xl">Your NFTs</div>
    {

        tokens === undefined ?

        <div className="mx-auto w-2/5 mt-20 bg-gray-500 rounded-3xl p-4 text-center">
        <Loader/></div>

        :

        tokens.length > 0 ?

        <div className="grid grid-cols-3 gap-1">{
            tokens?.map((t, _i)=>{
                return <NFTView token_id={t}/>
    
            })
        }</div>
        

        : <CommonMessageDiv>
        You do NOT have any collectibles yet. Go Mint or Buy some NFTs</CommonMessageDiv>
    }

    </div>

}
