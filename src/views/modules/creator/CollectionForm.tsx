import { FC , useState, useEffect} from "react";
import { TextField, commonTextfieldClassName } from "../../components/TextField";
import { Collection} from "pix0-js";
import {toUcoin, toCoinStr} from 'pix0-js';
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { CollectionViewProps, ViewType } from "./CollectionsView";
import { Select } from "../../components/Select";
import { RoyaltiesForm } from "./RoyaltiesForm";
import { TreasuriesForm } from "./TreasuriesForm";
import { CollectionLinksForm } from "./CollectionLinksForm";
import useCollectionContract from "pix0-react";
import { TxHashDiv } from "../../components/TxHashDiv";
import { ProceedOrCancelButtons } from "../../components/ProceedOrCancelButtons";
import './css/CollectionForm.css';

type props = CollectionViewProps & {

    isEditMode? : boolean,

    collectionToEdit? : Collection,
}


export const CollectionForm : FC <props>= ({
    isEditMode, setViewType, collectionToEdit
}) =>{

    const {createCollection, updateCollection} = useCollectionContract();

    const [txHash, setTxHash] = useState<Error|string>();

    const unsetTxHash = () =>{

        setTimeout(()=>{
            setTxHash(undefined);
        },7000);
    }

    const [processing, setProcessing] = useState(false);

    const saveCollection = async () =>{

        //console.log("coll.x", collection);

        setProcessing(true);

        if ( isEditMode ) {

            let tx = await updateCollection(collection);
            setTxHash(tx);

            if ( tx instanceof Error){
                unsetTxHash();
            }
        }
        else {

            if ( collection.name.trim() === "") {
                setTxHash(new Error('Name is blank!'));
                unsetTxHash();
                setProcessing(false);
                return;
            }

            if ( collection.symbol.trim() === "") {
                setTxHash(new Error('Symbol is blank!'));
                unsetTxHash();
                setProcessing(false);
                return;
            }

            let tx = await createCollection(collection);
            
            setTxHash(tx);

            if ( tx instanceof Error){
                unsetTxHash();
            }
        }

        setProcessing(false);
    }

    const [collection, setCollection] = useState<Collection>({
        name : "", symbol : ""
    });

    const statusSel = <Select onChange={(e)=>{
        setCollection({...collection, status : e.target.value});
    }}
    items={[
        {name: "Draft", value : "0"},
        {name: "Active", value : "1"},
        {name: "Deactivated", value : "2"},
    ]} value={`${collection.status ?? '0'}`}></Select>;


    useEffect(()=>{
        if ( isEditMode && collectionToEdit){
            setCollection(collectionToEdit);
        }
    },[isEditMode, collectionToEdit]);


    return <CommonAnimatedDiv className="text-center">
    <div className="mxl-2 p-2 mt-4 border border-gray-600 rounded-2xl w-full text-left shadow-md">
    <form className="shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 mt-4">
    <div className="mt-2 mb-4 font-bold bg-gray-600 p-2 rounded">
    {isEditMode ? "Update" : "Create"} Your Collection
    </div>
    {txHash && <TxHashDiv txHash={txHash}/>}
    <div className="mb-4">
        <TextField label="Name:" id="name" type="text" placeholder="Name"
        className={commonTextfieldClassName("w-1/2 inline-block")}
        onChange={(e)=>{
            setCollection({...collection, name : e.target.value});
        }} value={collection.name}/>
    
    </div>
    <div className="mb-4">
        <TextField label="Symbol:" id="symbol" type="text" placeholder="Symbol"
        className={commonTextfieldClassName("w-32 inline-block")}
        onChange={(e)=>{
            setCollection({...collection, symbol : e.target.value});
        }} value={collection.symbol}/>

        <div className="lgSel">
            <div className="inline-block mr-2 font-bold">Status:</div>{statusSel}
        </div>
    </div>
    <div className="mb-4 smSel">
    <div className="mb-2 font-bold">Status:</div>{statusSel}
    </div>
    <div className="mb-4">
        <TextField label="Description:" id="description" type="text" 
        placeholder="Description" className={commonTextfieldClassName("w-3/4 inline-block")}
        onChange={(e)=>{
            setCollection({...collection, description : e.target.value});
        }} value={collection.description}/>
    </div>
    <div className="mb-4">
        <TextField label="Minting Price:" id="price" type="number" 
        placeholder="Price" className={commonTextfieldClassName("w-32 inline-block")}
        onChange={(e)=>{
            let v = parseFloat(e.target.value);
            if ( v >= 0 ) {
                let prices = collection.prices;
                prices = [{price_type : 1, value: {amount : `${toUcoin(v)}`, 
                denom : "uconst"}}];
               setCollection({...collection, prices : prices});
            }
        }} value={`${toCoinStr(parseFloat(collection.prices?.filter(p=> {return p.price_type === 1;})[0].value.amount ?? '0'))}`}/>
        <div className="inline-block ml-2 font-bold text-md">CONST</div>
    </div>

    <div className="mb-4">
        <CollectionLinksForm collection={collection} setCollection={setCollection}/>
    </div>
   
    <div className="mb-4">
        <TreasuriesForm collection={collection} setCollection={setCollection}/>
    </div>
    <div className="mb-4">
        <RoyaltiesForm collection={collection} setCollection={setCollection}/>
    </div>
    <ProceedOrCancelButtons proceedAction={saveCollection} cancelAction={()=>{
        if ( setViewType)setViewType(ViewType.NONE);
    }} processing={processing} proceedButtonText={isEditMode ? "Edit" : "Create"}/>
    </form>
    </div></CommonAnimatedDiv>
}