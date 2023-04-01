import { FC, useState } from "react";
import { PulseLoader as Loader} from 'react-spinners';
import { NFTView } from "./NFTView";
import { CommonMessageDiv } from "../../components/CommonMessageDiv";
import { NFTListView } from "./NFTListView";
import { NFTDetailsView } from "./NFTDetailsView";


export enum ViewType {

    LIST, 

    DETAIL,

}


export const NFTsView : FC = () =>{

    const [viewType, setViewType] = useState<ViewType>(ViewType.LIST);

    const [tokenId, setTokenId] = useState<string>("");

    const switchView = () =>{

        switch (+viewType) {

            case ViewType.LIST :

                return <NFTListView/>;

            case ViewType.DETAIL :

                return <NFTDetailsView tokenId={tokenId}/>
        }

    }

    return <>{switchView()}</>

}
