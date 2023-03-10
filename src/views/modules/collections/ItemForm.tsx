import { FC , useState, useEffect} from "react";
import { TextField, commonTextfieldClassName } from "../../components/TextField";
import { Item, Collection} from "pix0-js-arch-test";
import { UploadField } from "../../components/UploadField";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { CollectionViewProps, ViewType } from "./CollectionsView";
import { PulseLoader as Loader} from 'react-spinners';
import useCollectionContract from "pix0-react2-arch-test";
import { TxHashDiv } from "../../components/TxHashDiv";



type props = CollectionViewProps & {

    isEditMode? : boolean,

    itemToEdit? : Item,

    forCollection : Collection,
}


export const ItemForm : FC <props>= ({
    isEditMode, setViewType, itemToEdit, forCollection
}) =>{

    const {createItem} = useCollectionContract();

    const [txHash, setTxHash] = useState<Error|string>();

    const unsetTxHash = () =>{

        setTimeout(()=>{
            setTxHash(undefined);
        },7000);
    }

    const [processing, setProcessing] = useState(false);

    const setMediaCallback = (_media: {mediaDataUrl? : string,contentType?: string,
        fileName?: string }, _index? : number ) => 
    {
    
    }
    

    const saveItem = async () =>{

        setProcessing(true);

        if ( isEditMode ) {

        }
        else {

            if ( item.name.trim() === "") {
                setTxHash(new Error('Name is blank!'));
                unsetTxHash();
                setProcessing(false);
                return;
            }


            let tx = await createItem(item);
            
            setTxHash(tx);

            if ( tx instanceof Error){
                unsetTxHash();
            }
        }

        setProcessing(false);
    }


    const [item, setItem] = useState<Item>({
        name : "", collection_name : "", collection_symbol : "", collection_owner : "",
        links : [], traits : [],
    });

    useEffect(()=>{
        if ( isEditMode && itemToEdit){
            setItem(itemToEdit);
        }
    },[isEditMode, itemToEdit]);


    return <CommonAnimatedDiv className="text-center">
    <div className="mxl-2 p-2 mt-4 border border-gray-600 rounded-2xl w-5/6 text-left shadow-md">
    {txHash && <TxHashDiv txHash={txHash}/>}
    <form className="shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 mt-4">
    <div className="mt-2 mb-4 font-bold bg-gray-600 p-2 rounded">
    {isEditMode ? "Update" : "Add"} Item For Collection "{forCollection.name} ({forCollection.symbol})"
    </div>
    <div className="mb-4">
        <TextField label="Name:" labelInline={true} id="name" type="text" placeholder="Name"
        labelRightMargin={"64px"} className={commonTextfieldClassName("w-1/2 inline-block")}
        onChange={(e)=>{
            setItem({...item, name : e.target.value});
        }} value={item.name}/>
    
    </div>
    <div className="mb-4">
        <TextField label="Description:" labelInline={true} id="description" type="text" 
        labelRightMargin={"22px"} placeholder="Description"  
        className={commonTextfieldClassName("w-3/4 inline-block")}
        onChange={(e)=>{
            setItem({...item, description : e.target.value});
        }} value={item.description}/>
    </div>
    <div className="mb-4">
        <UploadField label="Upload Image/Media" withImagePreview={true}
            setMediaCallback={setMediaCallback}/>
    </div>
    <div className="mb-4 bg-gray-700 p-2 rounded">
    <button className="mr-2 bg-blue-900 rounded-3xl p-2" 
    style={{width:"150px"}}
    onClick={async (e)=>{
        e.preventDefault();
        await saveItem();
    }}>{processing ? <Loader/> : <>{isEditMode ? "Update" : "Add Item"}</>}</button>

    <button className="ml-2 bg-red-900 rounded-3xl p-2" 
    style={{width:"150px"}}
    onClick={(e)=>{
        e.preventDefault();

        if ( setViewType)
            setViewType(ViewType.NONE);

    }}>Cancel</button>
    </div>

    </form>
    </div></CommonAnimatedDiv>
}