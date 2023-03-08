import { FC , useState} from "react";
import { TextField, commonTextfieldClassName } from "../../components/TextField";
import { Collection } from "pix0-js-arch-test";
import { CollectionViewProps, ViewType } from "./CollectionsView";


type props = CollectionViewProps & {

    isEditMode? : boolean,
}


export const CollectionForm : FC <props>= ({
    isEditMode, setViewType
}) =>{

    const [collection, setCollection] = useState<Collection>({
        name : "", symbol : ""
    });


    return <div className="mxl-2 p-2 mt-4 border-2 rounded-xl w-5/6 text-left">
    <form className="shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 mt-4">
    <div className="mt-2 mb-4 font-bold">
    {isEditMode ? "Update" : "Create"} Your Collection
    </div>
    <div className="mb-4">
        <TextField label="Name" labelInline={true} id="name" type="text" placeholder="Name"
        className={commonTextfieldClassName("w-96 block")}
        onChange={(e)=>{
            setCollection({...collection, name : e.target.value});
        }} value={collection.name}/>
    </div>
    <div className="mb-4">
        <TextField label="Symbol" labelInline={true} id="symbol" type="text" placeholder="Symbol"
        className={commonTextfieldClassName("w-32 block")}
        onChange={(e)=>{
            setCollection({...collection, symbol : e.target.value});
        }} value={collection.symbol}/>
    </div>
    <div className="mb-4">
        <TextField label="Description" labelInline={true} id="description" type="text" 
        placeholder="Description"
        onChange={(e)=>{
            setCollection({...collection, description : e.target.value});
        }} value={collection.description}/>
    </div>
    <div className="mb-4">
    <button className="bg-gray-600 rounded-3xl p-2" 
    style={{width:"150px"}}
    onClick={(e)=>{
        e.preventDefault();

        if ( setViewType)
            setViewType(ViewType.NONE);

    }}>Cancel</button>
    
    </div>
    </form>
    </div>
}