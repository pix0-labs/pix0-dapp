import { FC, useState, useCallback, useEffect } from "react";
import useCollectionContract from "pix0-react2-arch-test";
import { CommonMessageDiv } from "../CommonMessageDiv";

export const NFTsView : FC = () =>{

    const [tokens, setTokens] = useState<string[]>([]);

    const {getMintedTokensByOwner} = useCollectionContract();

    const fetchTokens = useCallback (async () =>{
        let nfts = await getMintedTokensByOwner({});

        console.log("Nfts...x", nfts);
        setTokens(nfts);
    }, []);


    useEffect(()=>{
        fetchTokens();
    },[fetchTokens]);

    return <div>
    {
        tokens.length > 0 ?

        tokens.map((t, i)=>{

            return <div>{i}. {t}</div>

        })

        : <CommonMessageDiv>
        You do NOT have any collectibles yet. Go Mint or Buy some NFTs</CommonMessageDiv>
    }

    </div>

}
