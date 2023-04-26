import { FC , ReactElement, useState} from "react";
import Popup from "reactjs-popup";
import { MintTemplatesSel, Template } from "./MintTemplatesSel";
import "../../css/Modal.css";

type props = {

    trigger? : ReactElement,

    selectTemplate? : (template : Template ) => void,

}

export const MintTemplatesSelPopup : FC <props> = ({
    trigger, selectTemplate
}) =>{

    const [open, setOpen] = useState(false);

    const closeModal = () => setOpen(false);

    
    return <Popup modal nested open={open} contentStyle={{background:"#222",maxWidth:"360px"}} 
    arrowStyle={{display:"none"}} position="bottom center"
    className="bg-gray-900 text-gray-300 w-64 p-4 m-4" onClose={closeModal}
    trigger={ trigger ?? <button style={{minWidth:"100px"}} onClick={() => setOpen(o => !o)} 
    className="bg-green-800 font-bold pl-2 pr-2 p-1 text-gray-100 rounded-3xl text-xs">Choose A Template</button>}
    closeOnEscape={false} closeOnDocumentClick={false} ><MintTemplatesSel selectTemplate={(tmpl)=>{
        if (selectTemplate){
            selectTemplate(tmpl);
        }
        setOpen(o => !o);
        //setOpen(false);
       // console.log("open::", open);
    }}/></Popup>
}