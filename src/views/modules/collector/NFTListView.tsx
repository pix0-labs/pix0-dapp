import { FC, useState, useCallback, useEffect } from "react";
import useCollectionContract from "pix0-react";
import { PulseLoader as Loader} from 'react-spinners';
import { NFTView } from "./NFTView";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { CommonMessageDiv } from "../../components/CommonMessageDiv";

export type NProps = {

    toNftDetails?: (tokenId : string) =>void, 

    backToList? : () => void, 
}


export const NFTListView : FC <NProps> = ({
    toNftDetails, backToList
}) =>{

    const [tokens, setTokens] = useState<string[]>();

    const {getMintedTokensByOwner} = useCollectionContract();

   
    const fetchTokens = useCallback (async () =>{
        
       let nfts = await getMintedTokensByOwner({});

        setTokens(nfts);
    }, []);


    useEffect(()=>{
        fetchTokens();
    },[fetchTokens]);

    return <CommonAnimatedDiv className="w-full p-2 items-center mx-auto">
     {

        tokens === undefined ?

        <div className="text-left p-2"><Loader color="#eee"/></div>
        :
        tokens.length > 0 ?

        <div className="flex flex-wrap text-center">{
            tokens?.map((t, _i)=>{
                return <NFTView key={`Nft_${_i}`} tokenId={t} index={_i} toNftDetails={toNftDetails}/>
            })
        }</div>
        
        : <CommonMessageDiv>You do NOT have any collectibles yet. Go Mint or Buy some NFTs</CommonMessageDiv>
    }

    </CommonAnimatedDiv>

}
