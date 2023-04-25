import { FC , useState} from "react";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { UploadField } from "../../components/UploadField";
import { Item } from 'pix0-js';
import useCollectionContract from "pix0-react";
import { TextField, commonTextfieldClassName } from "../../components/TextField";
import { TraitsForm } from "../creator/TraitsForm";
import { ProceedOrCancelButtons } from "../../components/ProceedOrCancelButtons";
import { ViewType } from "./CollectiblesView";
import usePage from "../../../hooks/usePage";
import { AiFillInfoCircle } from "react-icons/ai";
import { Page } from "../../../sm/PageActions";
import { TxHashDiv } from "../../components/TxHashDiv";
import { isHttpOrHttpsUrl } from "../../../utils";

type props = {

    setViewType?: (vType: ViewType) => void, 
}


export const SimpleMintForm : FC <props> = ({
    setViewType
}) =>{


    const [useUpload, setUseUpload] = useState(false);

    const [processing, setProcessing] = useState(false);

    const {simpleMint} = useCollectionContract();

    const {setPage} = usePage();

    const [item, setItem] = useState<Item>({
        collection_name : "Simple Mint",
        collection_symbol : "",
        collection_owner : "",
        name : "",
        links: [], 
        traits : [], 
    });


    const setMediaURI = (uri : string) :void =>{

        setItem({...item, links: [{link_type: 1, value: uri}]});
    }


    const setMediaCallback = (media: {
        mediaDataUrl? : string,
        contentType?: string,
        fileName? : string, }, _index? : number ) => {
        setMediaURI(media.mediaDataUrl ?? "");
    }

    const [txHash, setTxHash] = useState<Error|string>();

    const unsetTxHash = () =>{

        setTimeout(()=>{
            setTxHash(undefined);
        },7000);
    }

    const itemImageUri = () : string|undefined => {

        return item.links.filter(i=>{return i.link_type === 1})[0]?.value;

    }

    const obtainImageUriForTF = () : string =>{

        let iurl = itemImageUri();

        let v =  iurl ? (isHttpOrHttpsUrl(iurl) ? iurl : "") : "";
      //  console.log("vvv:::", v, isValidUrl(v));
        return v; 
    }


    const mintItem =async () =>{

        if (itemImageUri() === undefined){
            
            setTxHash(new Error("You must specify a media URI or upload a media for the item!"));
            unsetTxHash();
        
            return; 
        }
        if (item.name.trim() === ""){
            
            setTxHash(new Error("Item name cannot be blank!"));
            unsetTxHash();
        
            return; 
        }
        
        if (item.collection_symbol.trim() === ""){
            
            setTxHash(new Error("Item symbol cannot be blank!"));
            unsetTxHash();
        
            return; 
        }

        setProcessing(true);

        let tx = await simpleMint(item, true);

        setTxHash(tx);

        setProcessing(false);

        if ( tx instanceof Error)
            unsetTxHash();
        
    }

    return <CommonAnimatedDiv className="items-center">
    <div className="mxl-2 p-2 mt-4 border border-gray-600 rounded-md w-full text-left shadow-md"
    style={{width:"99%"}}>
    <form className="shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 mt-4">
        <div className="mt-2 mb-4 font-bold bg-gray-600 p-2 rounded pl-4">
        Simple Mint lets you quickly mint a piece of art that you truly own as an NFT into your wallet
        <CommonAnimatedDiv duration={2} className="text-xs text-gray-100 mt-1"><AiFillInfoCircle className="inline w-4 h-4 mr-2"/>Please note this 
        is currently just an experimental feature, which may experience some defects.</CommonAnimatedDiv> 
        </div>
        {txHash && <TxHashDiv txHash={txHash}/>}
        <div className="mb-4">
            { useUpload ? <UploadField withImagePreview={true} 
            useDragAndDrop={true}
            setMediaCallback={setMediaCallback}/> :
            <TextField label="Media URI" id="mediaURI" type="text" placeholder="Media URI"
            className={commonTextfieldClassName('w-3/6 inline-block')} value={obtainImageUriForTF()}
            onChange={(e)=>{
                setMediaURI(e.target.value);
            }}/>} 
            <span className="float-right">or<button disabled={processing}
            onClick={(e)=>{
                e.preventDefault();
                let useUpl = !useUpload;
                setUseUpload(useUpl);
            }}
            className="ml-2 bg-gray-500 text-gray-100 p-1 w-32 rounded-2xl">
            {useUpload? "input the URL?" : "upload a file?"}</button></span>
        </div>

        <div className="mb-4">
        <TextField label="Item Name" id="name" type="text" placeholder="Name"
            className={commonTextfieldClassName('w-4/6')}
            onChange={(e)=>{
                setItem( {...item, name: e.target.value});
        }}/>
        </div>

        <div className="mb-4">
        <TextField label="Symbol" id="symbol" type="text" placeholder="Symbol"
            className={commonTextfieldClassName('w-2/6')}
            onChange={(e)=>{
                setItem( {...item, collection_symbol: e.target.value});
        }}/>
        </div>
        <div className="mb-4">
            <TraitsForm item={item} setItem={setItem}/>
        </div>
        <ProceedOrCancelButtons proceedAction={async ()=>{
            await mintItem();
        }} cancelButtonText="Cancel" cancelAction={()=>{
        if ( setViewType)setViewType(ViewType.COLLECTIBLES);

        setPage(Page.Collectibles, ViewType.COLLECTIBLES);

    }} processing={processing} proceedButtonText={ "Mint NFT"}/>
    </form>
    </div></CommonAnimatedDiv>

}