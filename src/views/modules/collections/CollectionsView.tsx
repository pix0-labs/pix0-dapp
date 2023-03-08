import { FC , useState} from "react";
import { CollectionsListView } from "./CollectionsListView";
import { CollectionForm } from "./CollectionForm";
import { FiPlusCircle} from 'react-icons/fi';

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

    return <div className="text-left p-4">
    <button 
    style={{width:"200px"}}
    className="bg-gray-600 rounded-3xl p-2 mb-4" onClick={(e)=>{
        e.preventDefault();
        setViewType(ViewType.CREATE);
    }}><FiPlusCircle style={{marginRight:"4px",display:"inline",marginBottom:"4px"}}/>Add Collection</button>
        {switchView()}</div>;
}
