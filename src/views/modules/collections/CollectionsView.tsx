import { FC , useState} from "react";
import { CollectionsListView } from "./CollectionsListView";
import { CollectionForm } from "./CollectionForm";
import { ItemForm } from "./ItemForm";
import { ItemsListView } from "./ItemsListView";
import { FiPlusCircle} from 'react-icons/fi';
import { FcCancel} from 'react-icons/fc';

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

    const button = () => {

        if (viewType === ViewType.NONE || 
            viewType === ViewType.LIST || viewType === undefined) 
             return <button 
            style={{width:"200px"}}
            className="bg-gray-600 rounded-3xl p-2 mb-4" onClick={(e)=>{
                e.preventDefault();
                setViewType(ViewType.CREATE);
            }}><FiPlusCircle style={{marginRight:"4px",display:"inline",marginBottom:"4px"}}/>Add Collection</button>
    
        else if (viewType === ViewType.ITEMS_LIST)

            return <button className="rounded-3xl bg-gray-700 text-gray-100 p-2 text-center mb-2"
            style={{minWidth:"120px"}}
            onClick={(e)=>{
                e.preventDefault();
                if ( setViewType)
                    setViewType(ViewType.LIST);
            }}><FcCancel className="mr-2 inline mb-1"/>Close</button>

        else 
            return <></>;

    } 
    return <div className="text-left p-4">{button()}
        {switchView()}</div>;
}
