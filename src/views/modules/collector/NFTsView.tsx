import { FC, useState } from "react";
import { NFTListView } from "./NFTListView";
import { NFTDetailsView } from "./NFTDetailsView";


export enum ViewType {

    LIST, 

    DETAIL,

}


export const NFTsView : FC = () =>{

    const [viewType, setViewType] = useState<ViewType>(ViewType.LIST);

    const [tokenId, setTokenId] = useState<string>("");


    const toNftDetails = (tokenId : string ) =>{

        setTokenId(tokenId);
        setViewType(ViewType.DETAIL);
    }

    const backToList = () =>{
        setViewType(ViewType.LIST);
    }

    const switchView = () =>{

        switch (+viewType) {

            case ViewType.LIST :

                return <NFTListView toNftDetails={toNftDetails}/>;

            case ViewType.DETAIL :

                return <NFTDetailsView tokenId={tokenId} backToList={backToList}/>
        }

    }

    return <>{switchView()}</>

}
