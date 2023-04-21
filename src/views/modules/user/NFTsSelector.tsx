import { FC, useState, useCallback, useEffect } from "react";
import useCollectionContract from "pix0-react";
import { PulseLoader as Loader} from 'react-spinners';
import { NFTView } from "./NFTView";
import { CommonMessageDiv } from "../../components/CommonMessageDiv";

export type NProps = {

    selectNft?: (tokenId : string, imageUrl? : string ) =>void,  
}


export const NFTsSelector: FC <NProps> = ({
    selectNft
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

    return <div className="w-full p-2 items-center mx-auto">
     {

        tokens === undefined ?

        <div className="text-left p-2"><Loader color="#eee"/></div>
        :
        tokens.length > 0 ?

        <div className="p-1 overflow-y-auto bg-gray-800 rounded" style={{maxHeight:"360px"}}>
            <div className="font-bold text-gray-100 pl-4">Choose an NFT as your profile picture</div>
            <div className="flex flex-wrap items-stretch">{
                tokens?.map((t, _i)=>{
                    return <NFTView key={`Nft_${_i}`} tokenId={t} index={_i} selectNft={selectNft}/>
                })
            }</div>
        </div>
        : <CommonMessageDiv>You do NOT have any collectibles yet. Go Mint or Buy some NFTs</CommonMessageDiv>
    }

    </div>

}
