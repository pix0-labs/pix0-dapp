import { FC , useState} from "react";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { UploadField } from "../../components/UploadField";
import { Item } from 'pix0-js';
import useCollectionContract from "pix0-react";
import { TextField, commonTextfieldClassName } from "../../components/TextField";
import { TraitsForm } from "../creator/TraitsForm";
import { ProceedOrCancelButtons } from "../../components/ProceedOrCancelButtons";
import { ViewType } from "./CollectiblesView";
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

    return <CommonAnimatedDiv className="text-center">
    <div className="mxl-2 p-2 mt-4 border border-gray-600 rounded-2xl w-5/6 text-left shadow-md">
    <form className="shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 mt-4">
        <div className="mt-2 mb-4 font-bold bg-gray-600 p-2 rounded-3xl pl-4">
        Simple Mint lets you quickly mint a piece of art that you own as an NFT into your wallet 
        </div>
        {txHash && <TxHashDiv txHash={txHash}/>}
        <div className="mb-4">
            { useUpload ? <UploadField withImagePreview={true} 
            useDragAndDrop={true}
            setMediaCallback={setMediaCallback}/> :
            <TextField label="Media URI" id="mediaURI" type="text" placeholder="Media URI"
            className={commonTextfieldClassName('w-3/6')} value={obtainImageUriForTF()}
            onChange={(e)=>{
                setMediaURI(e.target.value);
            }}/>} 
            <span className="mr-4">or<button disabled={processing}
            onClick={(e)=>{
                e.preventDefault();
                let useUpl = !useUpload;
                setUseUpload(useUpl);
            }}
            className="ml-2 bg-gray-500 text-gray-100 p-1 w-32 rounded-2xl inline-block">
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
    }} processing={processing} proceedButtonText={ "Mint NFT"}/>
    </form>
    </div></CommonAnimatedDiv>

}