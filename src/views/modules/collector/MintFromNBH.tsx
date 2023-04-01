import { FC , useState } from "react";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { CollectionDetailsView } from "./CollectionDetailsView";
import { CollectionsView } from "./CollectionsView";
import { Collection } from "pix0-js";

export enum ViewType {

    DETAIL,

    COLLECTIONS, 
}


export const MintFromNBH : FC = () =>{

    const [ viewType, setViewType] = useState<ViewType>(ViewType.COLLECTIONS);

    const [collection, setCollection] = useState<Collection>({
        name : "", symbol : "", 
    });

    const switchView = () =>{

        switch(+viewType) {

            case ViewType.COLLECTIONS:

                return <CollectionsView/>

            case ViewType.DETAIL :

                return <CollectionDetailsView collection={collection}/>

        }
        
    }

    return <CommonAnimatedDiv className="text-center">
        {switchView()}
    </CommonAnimatedDiv>
}