import { FC , useState, useEffect} from "react";
import { TextField, commonTextfieldClassName } from "../../components/TextField";
import { Item, Collection} from "pix0-js";
//import { FileUploadField as UploadField } from "../../components/FileUploadField";
import { UploadField } from "../../components/UploadField";
import { TraitsForm } from "./TraitsForm";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { CollectionViewProps, ViewType } from "./CollectionsView";
import useCollectionContract from "pix0-react";
import { TxHashDiv } from "../../components/TxHashDiv";
import { mediaUpload } from "pix0-react";
import { ProceedOrCancelButtons } from "../../components/ProceedOrCancelButtons";

export interface Media {

    mediaDataUrl? : string,
    
    contentType?: string,
    
    fileName?: string, 
}

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

    const [media, setMedia] = useState<Media>();

    const unsetTxHash = () =>{

        setTimeout(()=>{
            setTxHash(undefined);
        },7000);
    }

    const [processing, setProcessing] = useState(false);

    const setMediaCallback = async (_media: Media, _index? : number ) => 
    {
        setMedia(_media);  
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

            if(media === undefined){

                setTxHash(new Error('No image is provided!'));
                unsetTxHash();
                setProcessing(false);
                return;
            }

            if ( media.mediaDataUrl) {

                let tx = await mediaUpload(media.mediaDataUrl);

                if (tx instanceof Error) {

                    setTxHash(tx);
                    setProcessing(false);
                    return; 
                }

                item.links = [{
                    link_type : 1,
                    value : tx, 
                }];

            }
            else {

                setTxHash(new Error("Undefined media url!!"));
                return;
            }
            
            item.collection_name = forCollection.name;
            item.collection_owner = forCollection.owner ?? "";
            item.collection_symbol = forCollection.symbol;

            //console.log("Going to create item::", item);

            let tx = await createItem(item);
            
            setMedia(undefined);

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
    <form className="shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 mt-4">
    <div className="mt-2 mb-4 font-bold bg-gray-600 p-2 rounded">
    {isEditMode ? "Update" : "Add"} Item For Collection "{forCollection.name} ({forCollection.symbol})"
    </div>
    {txHash && <TxHashDiv txHash={txHash}/>}
    <div className="mb-4">
        <TextField label="Name:" id="name" type="text" placeholder="Name"
        className={commonTextfieldClassName("w-1/2 inline-block")}
        onChange={(e)=>{
            setItem({...item, name : e.target.value});
        }} value={item.name}/>
    
    </div>
    <div className="mb-4">
        <TextField label="Description:" id="description" type="text" 
        placeholder="Description"  
        className={commonTextfieldClassName("w-3/4 inline-block")}
        onChange={(e)=>{
            setItem({...item, description : e.target.value});
        }} value={item.description}/>
    </div>
    <div className="mb-4">
        <UploadField label="Upload Image/Media" withImagePreview={true}
        useDragAndDrop={true}
            setMediaCallback={setMediaCallback} onClick={()=>{
                setMedia(undefined);
            }}/>
    </div>
    <div className="mb-4">
        <TraitsForm item={item} setItem={setItem}/>
    </div>
    <ProceedOrCancelButtons proceedAction={saveItem} cancelAction={()=>{
        if ( setViewType)setViewType(ViewType.NONE);
    }} processing={processing} proceedButtonText={isEditMode ? "Edit" : "Create"}/>
    </form>
    </div></CommonAnimatedDiv>
}