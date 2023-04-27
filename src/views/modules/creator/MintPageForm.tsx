import { FC , useState, useEffect} from "react";
import { TextField, commonTextfieldClassName } from "../../components/TextField";
import { MintPage, Collection, mintPageLogoUrl} from "pix0-js";
import { MintTemplatesSelPopup } from "./MintTemplatesSelPopup";
import useTxHash from "../../../hooks/useTxHash";
import { UploadField } from "../../components/UploadField";
import { CollectionViewProps, ViewType} from './CollectionsView';
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { AiOutlineCloudUpload, AiFillCheckCircle } from "react-icons/ai";
import {useMintPageContract, uploadToCloud} from "pix0-react";
import { TxHashDiv } from "../../components/TxHashDiv";
import { Page } from "../../../sm/PageActions";
import { Template , getTemplate} from "./MintTemplatesSel";
import { PulseLoader as Loader } from "react-spinners";
import { ProceedOrCancelButtons } from "../../components/ProceedOrCancelButtons";
import { Media } from "./ItemForm";
import usePage from "../../../hooks/usePage";

type props = CollectionViewProps & {

    isEditMode? : boolean,

    collection? : Collection,

    mintPageToEdit? : MintPage,
}


export const MintPageForm : FC <props>= ({
    isEditMode, mintPageToEdit, collection, setViewType 
}) =>{

    const {createMintPage,updateMintPage} = useMintPageContract();
    
    const {txHash, setTxHash, setError} = useTxHash();

    const [processing, setProcessing] = useState(false);

    const [uploading, setUploading] = useState(false);

    const [uploaded, setUploaded] = useState(false);

    const [mediaUrl, setMediaUrl] = useState<string>();

    const [chosenTemplate, setChosenTemplate] = useState<Template>();

    const [notToShowUploadLogo, setNotToShowUploadLogo] = useState(false);

    const {setPage} = usePage();

    const saveMintPage = async () =>{

        //console.log("coll.x", collection);

        setProcessing(true);

        if ( isEditMode ) {

            let tx = await updateMintPage(mintPage);
            setTxHash(tx);
        }
        else {

            let tx = await createMintPage(mintPage);            
            setTxHash(tx);
        }

        setProcessing(false);
    }

    const [mintPage, setMintPage] = useState<MintPage>({
        collection_name : collection?.name ?? "",
        collection_symbol : collection?.symbol ?? "",
    });

    const [logoUrl, setLogoUrl] = useState<string>();

    useEffect(()=>{
        if ( isEditMode && mintPageToEdit){
            setMintPage(mintPageToEdit);
            setChosenTemplate( getTemplate(mintPageToEdit.page_template ?? 0));
            setLogoUrl(mintPageLogoUrl(mintPageToEdit));
            setNotToShowUploadLogo(true);
        }
        else {

            if ( collection){
                setMintPage({
                    collection_name: collection.name,
                    collection_symbol : collection.symbol,
                    description : collection.description, 
                })
            }
        }
    },[isEditMode, mintPageToEdit, collection]);


    const setMediaCallback = async (_media: Media, _index? : number ) => 
    {
        setMediaUrl(_media.mediaDataUrl); 
    }

    const uploadNow = async () =>{
        if ( mediaUrl ){
            setUploading(true);
            let url = await uploadToCloud(mediaUrl);
            if ( url instanceof Error){
                setError(url);
                setMediaUrl(undefined);
            }
            else {
                let newMintpage = {...mintPage, attributes : [{name : "LOGO", value : url}]};
                setMintPage(newMintpage);
                setMediaUrl(undefined);
                
                setUploaded(true);
                setTimeout(()=>{
                    setUploaded(false);
                },5000);
            }
          
            setUploading(false);
        }
    }
    

    return <CommonAnimatedDiv className="text-center">
    <div className="mxl-2 p-2 mt-4 border border-gray-600 rounded-md w-full text-left shadow-md">
    <div className="mt-2 mb-4 bg-gray-600 p-2 rounded">
    {isEditMode ? "Update" : "Create"} Mint Web Page For Collection<span 
    className="font-bold ml-1">{collection?.name ?? mintPageToEdit?.collection_name} 
    &nbsp;({collection?.symbol ?? mintPageToEdit?.collection_symbol})</span>
    </div>
    {txHash && <TxHashDiv txHash={txHash}/>}
    <div className="mb-4">
        <TextField label="Description:" id="description" type="text" placeholder="Name"
        className={commonTextfieldClassName("w-10/12 inline-block")}
        onChange={(e)=>{
            setMintPage({...mintPage, description : e.target.value});
        }} value={mintPage.description}/>
    </div>
   
    <div className="mb-4">
        {logoUrl && <div className="block mb-2">
        <img src={logoUrl} className="w-14 h-14" />
        </div>}
        <div className="text-gray-100 text-xs font-bold mb-1">{ isEditMode ? 
        <button className="bg-gray-600 rounded text-gray-100 p-1" onClick={(e)=>{
            e.preventDefault();
            setNotToShowUploadLogo(!notToShowUploadLogo);
        }}>Change</button> : <>Upload</>} Logo:</div>
        {!notToShowUploadLogo && <UploadField label="Upload Logo" withImagePreview={true} useDragAndDrop={true}
        setMediaCallback={setMediaCallback} onClick={()=>{
            setMediaUrl(undefined)
        }}/>}{mediaUrl && <button style={{minWidth:"120px"}} 
        className="p-1 bg-gray-500 text-gray text-sm font-bold rounded-3xl block"
        disabled={uploading} onClick={async (e)=>{
            e.preventDefault();
            await uploadNow();
        }}>
        { uploading ? <Loader size={6} color="white"/> : <><AiOutlineCloudUpload 
        className="inline mr-2 w-5 h-5"/>Upload</>}</button>}
        {uploaded && <CommonAnimatedDiv className="bg-gray-500 text-gray-100 rounded p-2">Uploaded!</CommonAnimatedDiv>}
    </div>

    <div className="mb-4">
        <MintTemplatesSelPopup selectTemplate={(t)=>{
            setChosenTemplate(t);
            setMintPage({...mintPage, page_template: t.id});
        }}/>
        {chosenTemplate && 
        <div className="text-gray-100 text-sm mt-1 font-bold"><AiFillCheckCircle 
        className="mr-1 w-4 h-4 inline-block"/>{chosenTemplate.name}</div>}
    </div>
   
    <ProceedOrCancelButtons proceedAction={saveMintPage} cancelAction={()=>{
        if ( setViewType)setViewType(ViewType.LIST);
        setPage(Page.CreateCollection, ViewType.LIST);

    }} processing={processing} proceedButtonText={isEditMode ? "Edit" : "Create"}/>
    </div></CommonAnimatedDiv>
}