import { FC, useCallback, useEffect, useState } from "react";
import {useMintPageContract} from 'pix0-react';
import { MintPage} from 'pix0-js';
import { Template1 } from "./templates/Template1";

type props = {
    pageId : string, 
}

export const MintPageView : FC <props> = ({
    pageId
}) =>{

    const {getMintPageBy} = useMintPageContract();

    const [mintPage, setMintPage] = useState<MintPage>();

    const fetchMintPage = useCallback(async ()=>{
        let mp = await getMintPageBy(pageId);
        setMintPage(mp);
        document.title = mp.collection_name;
    },[pageId]);

    useEffect(()=>{
        fetchMintPage();
    },[fetchMintPage]);

    const switchView = () =>{

        if (mintPage && (mintPage?.page_template ?? 0) === 1) {

            return <Template1 mintPage={mintPage}/>
        }
     
        return <></>
    }

    return <>{switchView()}</>
}