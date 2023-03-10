import { FC , useState} from "react";
import { CollectionsListView } from "./CollectionsListView";
import { CollectionForm } from "./CollectionForm";
import { ItemForm } from "./ItemForm";
import { ItemsListView } from "./ItemsListView";
import { FiPlusCircle} from 'react-icons/fi';

export enum ViewType {

    LIST,

    CREATE,

    EDIT,

    ADD_ITEM,

    ITEMS_LIST,

    NONE,
}

export type CollectionViewProps = {

    viewType?: ViewType,

    setViewType? : (viewType : ViewType, param? : any) => void,
}

export const CollectionsView : FC  = () =>{

    const [viewType, setViewType] = useState<ViewType>();

    const [viewTypeParam, setViewTypeParam] = useState<any>();

    const setViewTypeForEdit = (viewType : ViewType, param : any) => {

        setViewType(viewType);
        setViewTypeParam(param);
    }

    const switchView = () =>{

        if (viewType) {

            switch(+viewType) {

                case ViewType.CREATE :
    
                    return <CollectionForm viewType={viewType} setViewType={setViewType}/>;

                case ViewType.EDIT :
    
                    return <CollectionForm viewType={viewType} 
                    setViewType={setViewType} isEditMode={true} collectionToEdit={viewTypeParam}/>;
    
                case ViewType.LIST :
    
                    return <CollectionsListView setViewType={setViewTypeForEdit}/>

                case ViewType.ITEMS_LIST :
    
                    return <ItemsListView setViewType={setViewTypeForEdit} 
                    collection_name={viewTypeParam.name} collection_symbol={viewTypeParam.symbol}/>
    
                case ViewType.ADD_ITEM :
    
                    return <ItemForm forCollection={viewTypeParam} viewType={viewType} setViewType={setViewType}/>
    
                default :
    
                    return <CollectionsListView setViewType={setViewTypeForEdit}/>
            }
    
        }
        else {

            return <CollectionsListView setViewType={setViewTypeForEdit}/>
            
        }
    }

    return <div className="text-left p-4">{(viewType === ViewType.NONE || 
        viewType === ViewType.LIST || viewType === undefined) && <button 
    style={{width:"200px"}}
    className="bg-gray-600 rounded-3xl p-2 mb-4" onClick={(e)=>{
        e.preventDefault();
        setViewType(ViewType.CREATE);
    }}><FiPlusCircle style={{marginRight:"4px",display:"inline",marginBottom:"4px"}}/>Add Collection</button>}
        {switchView()}</div>;
}
