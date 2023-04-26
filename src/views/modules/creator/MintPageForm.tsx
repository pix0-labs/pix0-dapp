import { FC , useState, useEffect} from "react";
import { TextField, commonTextfieldClassName } from "../../components/TextField";
import { MintPage, Collection} from "pix0-js";
import useTxHash from "../../../hooks/useTxHash";
import { CollectionViewProps, ViewType} from './CollectionsView';
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import {useMintPageContract} from "pix0-react";
import { TxHashDiv } from "../../components/TxHashDiv";
import { Page } from "../../../sm/PageActions";
import { ProceedOrCancelButtons } from "../../components/ProceedOrCancelButtons";
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


    useEffect(()=>{
        if ( isEditMode && mintPageToEdit){
            setMintPage(mintPageToEdit);
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


    return <CommonAnimatedDiv className="text-center">
    <div className="mxl-2 p-2 mt-4 border border-gray-600 rounded-md w-full text-left shadow-md">
    <form className="shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 mt-4">
    <div className="mt-2 mb-4 bg-gray-600 p-2 rounded">
    {isEditMode ? "Update" : "Create"} Minting Web Page For Collection<span 
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
       
    </div>
   
    <ProceedOrCancelButtons proceedAction={saveMintPage} cancelAction={()=>{
        if ( setViewType)setViewType(ViewType.LIST);
        setPage(Page.CreateCollection, ViewType.LIST);

    }} processing={processing} proceedButtonText={isEditMode ? "Edit" : "Create"}/>
    </form>
    </div></CommonAnimatedDiv>
}