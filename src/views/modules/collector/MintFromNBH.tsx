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


    const toCollectionDetails = (_collection : Collection) => {

        setCollection(_collection);
        setViewType(ViewType.DETAIL)
    }

    const switchView = () =>{

        switch(+viewType) {

            case ViewType.COLLECTIONS:

                return <CollectionsView toCollectionDetails={toCollectionDetails}/>

            case ViewType.DETAIL :

                return <CollectionDetailsView collection={collection}/>

            default :
                return <CollectionsView toCollectionDetails={toCollectionDetails}/>
        }
        
    }

    return <CommonAnimatedDiv className="text-center">
        {switchView()}
    </CommonAnimatedDiv>
}