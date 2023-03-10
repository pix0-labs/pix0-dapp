import { FC , useState, useEffect} from "react";
import { TextField, commonTextfieldClassName } from "../../components/TextField";
import { Collection} from "pix0-js-arch-test";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { CollectionViewProps, ViewType } from "./CollectionsView";
import { Select } from "../../components/Select";
import { RoyaltiesForm } from "./RoyaltiesForm";
import { PulseLoader} from 'react-spinners';
import { TreasuriesForm } from "./TreasuriesForm";
import useCollectionContract from "pix0-react2-arch-test";
import { TxHashDiv } from "../../components/TxHashDiv";



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

    useEffect(()=>{
        if ( isEditMode && collectionToEdit){
            setCollection(collectionToEdit);
        }
    },[isEditMode, collectionToEdit]);


    return <CommonAnimatedDiv className="text-center">
    <div className="mxl-2 p-2 mt-4 border border-gray-600 rounded-2xl w-5/6 text-left shadow-md">
    <form className="shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 mt-4">
    <div className="mt-2 mb-4 font-bold bg-gray-600 p-2 rounded">
    {isEditMode ? "Update" : "Create"} Your Collection
    </div>
    {txHash && <TxHashDiv txHash={txHash}/>}
    <div className="mb-4">
        <TextField label="Name:" labelInline={true} id="name" type="text" placeholder="Name"
        labelRightMargin={"64px"} className={commonTextfieldClassName("w-1/2 inline-block")}
        onChange={(e)=>{
            setCollection({...collection, name : e.target.value});
        }} value={collection.name}/>
    
    </div>
    <div className="mb-4">
        <TextField label="Symbol:" labelInline={true} 
        labelRightMargin={"52px"}
       
        id="symbol" type="text" placeholder="Symbol"
        className={commonTextfieldClassName("w-32 inline-block")}
        onChange={(e)=>{
            setCollection({...collection, symbol : e.target.value});
        }} value={collection.symbol}/>

        <div className="inline-block ml-2 font-bold text-md">Status: 
        <Select
        onChange={(e)=>{
            setCollection({...collection, status : e.target.value});
        }}
        items={[
            {name: "Draft", value : "0"},
            {name: "Active", value : "1"},
            {name: "Deactivated", value : "2"},
        ]} value={`${collection.status ?? '0'}`}></Select></div>
    </div>
    <div className="mb-4">
        <TextField label="Description:" labelInline={true} id="description" type="text" 
        labelRightMargin={"22px"} placeholder="Description"  
        className={commonTextfieldClassName("w-3/4 inline-block")}
        onChange={(e)=>{
            setCollection({...collection, description : e.target.value});
        }} value={collection.description}/>
    </div>
    <div className="mb-4">
        <TextField label="Minting Price:" labelInline={true} id="price" type="text" 
        labelRightMargin={"10px"} placeholder="Price"  
        className={commonTextfieldClassName("w-32 inline-block")}
        onChange={(e)=>{
            let prices = collection.prices;
            prices = [{price_type : 1, value:e.target.value,
            denom :"uconst" }]
        
            setCollection({...collection, prices : prices});
        }} value={`${collection.prices?.filter(p=> {return p.price_type === 1;})[0].value ?? 1}`}/>
        <div className="inline-block ml-2 font-bold text-md">uconst</div>
    </div>

    <div className="mb-4">
        <TreasuriesForm collection={collection} setCollection={setCollection}/>
    </div>
    <div className="mb-4">
        <RoyaltiesForm collection={collection} setCollection={setCollection}/>
    </div>
    <div className="mb-4 bg-gray-700 p-2 rounded">
    <button className="mr-2 bg-cyan-900 rounded-3xl p-2" 
    style={{width:"150px"}} disabled={processing}
    onClick={async (e)=>{
        e.preventDefault();
        await saveCollection();
    }}>{processing ? <PulseLoader color="#eee" margin={2}/> 
    : <>{isEditMode ? "Update" : "Create"}</>}</button>

    <button className="ml-2 bg-gray-600 rounded-3xl p-2" 
    style={{width:"150px"}} disabled={processing}
    onClick={(e)=>{
        e.preventDefault();

        if ( setViewType)
            setViewType(ViewType.NONE);

    }}>Cancel</button>
    </div>

    </form>
    </div></CommonAnimatedDiv>
}