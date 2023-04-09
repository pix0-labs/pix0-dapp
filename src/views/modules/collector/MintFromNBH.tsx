import { FC , useState } from "react";
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

    const backToList = () =>{

        setViewType(ViewType.COLLECTIONS);
    }

    const toCollectionDetails = (_collection : Collection) => {

        setCollection(_collection);
        setViewType(ViewType.DETAIL)
    }

    const switchView = () =>{

        switch(+viewType) {

            case ViewType.COLLECTIONS:

                return <CollectionsView toCollectionDetails={toCollectionDetails}/>

            case ViewType.DETAIL :

                return <CollectionDetailsView collection={collection} backToList={backToList}/>

            default :
                return <CollectionsView toCollectionDetails={toCollectionDetails}/>
        }
        
    }

    return <div className="items-center w-full">
        {switchView()}
    </div>
}