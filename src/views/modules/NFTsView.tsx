import { FC, useState, useCallback, useEffect } from "react";
import useCollectionContract from "pix0-react2-arch-test";
import { PulseLoader as Loader} from 'react-spinners';
import { NFTView } from "./NFTView";
import { CommonMessageDiv } from "../components/CommonMessageDiv";

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

    return <div className="w-full p-2 text-center">

    <div className="bg-gray-700 p-2 text-left w-3/5 shadow-md rounded-xl">Your NFTs</div>
    {

        tokens === undefined ?

        <div className="text-left p-2"><Loader
        color="#eee"/></div>
        :

        tokens.length > 0 ?

        <div className="flex flex-wrap text-center">{
            tokens?.map((t, _i)=>{
                return <NFTView token_id={t}/>
            })
        }</div>
        
        : <CommonMessageDiv>You do NOT have any collectibles yet. Go Mint or Buy some NFTs</CommonMessageDiv>
    }

    </div>

}
