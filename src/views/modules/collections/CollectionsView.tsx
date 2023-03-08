import { FC , useState} from "react";
import { CollectionsListView } from "./CollectionsListView";
import { CollectionForm } from "./CollectionForm";
import { View } from "../../View";

export enum ViewType {

    LIST,

    CREATE,

    NONE,
}

export type CollectionViewProps = {

    viewType?: ViewType,

    setViewType? : (viewType : ViewType) => void,
}

export const CollectionsView : FC  = () =>{

    const [viewType, setViewType] = useState<ViewType>();


    const switchView = () =>{

        if (viewType) {

            switch(+viewType) {

                case ViewType.CREATE :
    
                    return <CollectionForm viewType={viewType} setViewType={setViewType}/>;
    
                case ViewType.LIST :
    
                    return <CollectionsListView/>
    
                default :
    
                    return <CollectionsListView/>
            }
    
        }
        else {

            return <CollectionsListView/>
            
        }
    }

    return <div className="text-left">
    <button 
    style={{width:"200px"}}
    className="bg-gray-600 rounded-3xl p-2" onClick={(e)=>{
        e.preventDefault();
        setViewType(ViewType.CREATE);
    }}>Create Collection</button>
        {switchView()}</div>;
}
