import { FC , useState} from "react";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { UploadField } from "../../components/UploadField";
import { Item } from 'pix0-js';
import { TextField, commonTextfieldClassName } from "../../components/TextField";
import { TraitsForm } from "../creator/TraitsForm";


export const SimpleMintForm : FC = () =>{


    const [useUpload, setUseUpload] = useState(false);

    const [mediaURI, setMediaURI] = useState<string>();

    const [mediaDataUrl, setMediaDataUrl] = useState<{mediaDataUrl? : string,
        contentType?: string,fileName? : string, }>();

    const [processing, setProcessing] = useState(false);

    const [item, setItem] = useState<Item>({
        collection_name : "Simple Mint",
        collection_symbol : "",
        collection_owner : "",
        name : "",
        links: [], 
        traits : [], 
    });


    const setMediaCallback = (media: {
        mediaDataUrl? : string,
        contentType?: string,
        fileName? : string, }, _index? : number ) => {

        setMediaDataUrl(media);
    }

    return <CommonAnimatedDiv className="text-center">
    <div className="mxl-2 p-2 mt-4 border border-gray-600 rounded-2xl w-5/6 text-left shadow-md">
    <form className="shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 mt-4">
        <div className="mt-2 mb-4 font-bold bg-gray-600 p-2 rounded-3xl pl-4">
        This lets you quickly mint a piece of art that you own as an NFT into your wallet 
        </div>

        <div className="mb-4">
            { useUpload ? <UploadField withImagePreview={true} 
            useDragAndDrop={true}
            setMediaCallback={setMediaCallback}/> :
            <TextField label="Media URI" id="mediaURI" type="text" placeholder="Media URI"
            className={commonTextfieldClassName('w-3/6')}
            onChange={(e)=>{
                setMediaURI(e.target.value);
            }}/>} 
            or<button disabled={processing}
            onClick={(e)=>{
                e.preventDefault();
                let useUpl = !useUpload;
                setUseUpload(useUpl);
                if (!useUpl){
                    setMediaDataUrl(undefined);
                }
            }}
            className="ml-2 bg-gray-500 text-gray-100 p-1 w-32 rounded-2xl inline">
            {useUpload? "input the URL?" : "upload a file?"}</button>
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
   
    </form>
    </div></CommonAnimatedDiv>

}