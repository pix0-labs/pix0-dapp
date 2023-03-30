import { FC, useState } from 'react';
import { CommonAnimatedDiv } from './CommonAnimatedDiv';
import { FcDisapprove } from 'react-icons/fc';
import { FileUploader } from "react-drag-drop-files";
import { checkIfFileValid } from './FileUploadField';
import { Props } from './FileUploadField';
import placeholder from '../../images/placeholder100.svg';
import './css/Dnd.css';

export type DndProps = Props & {

    multipleUpload? : boolean,
}


export const DndUploadField : FC <DndProps> = ({
    maxFileSize, allowedFileTypes, multipleUpload, 
    setMediaCallback, index, onClick, withImagePreview, id 
}) =>{

    const [error, setError] = useState<Error>();

    const [mediaDataUrl, setMediaDataUrl] = useState<string>();

    const [contentType, setContentType] = useState<string>();

    const handleMediaDataUrl = async  (file : any ) =>{

        if (file === undefined) 
            return;

        if (!checkIfFileValid(file, maxFileSize, allowedFileTypes, setError)){            
            return; 
        }

        setContentType(file.type);
            
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            // convert image file to base64 string
            let res = reader.result;
            if ( typeof res === 'string') {
                setMediaDataUrlNow(res, file.type, file.name);
            }
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }    
    }

    const setMediaDataUrlNow = (dataUrl? : string, _contentType? : string, fileName? : string  ) =>{

        setMediaDataUrl(dataUrl);
        if ( setMediaCallback) {
            setMediaCallback({mediaDataUrl : dataUrl, contentType: _contentType,
            fileName : fileName}, index);
        }
    }

   
    const onChange = async (file : any ) =>{

        await handleMediaDataUrl(file);
    }


    return  <div className="hover:bg-gray-900 bg-gray-800 text-gray-100 
    hover:cursor-pointer inline-block pt-4 pb-4 pl-4 pr-4 rounded-2xl mb-6" 
    style={{minWidth:"320px", color:"white", maxHeight:"80px", display:"inline-block"}}>
        <CommonAnimatedDiv className="text-red-400 text-xs text-left" visible={error!==undefined}
        dismissAfterInSeconds={5}><FcDisapprove className="inline-block mr-2"/>{error?.message}</CommonAnimatedDiv>
        
         <FileUploader handleChange={onChange} classes="dropArea"
         name={`file_${id}`} types={allowedFileTypes}
         multipleUpload={multipleUpload} onClick={(e :any)=>{
            setMediaDataUrl(undefined);
            setContentType(undefined);
            if ( onClick )
                onClick(e);
         }}/>
        
         { withImagePreview  && <img id={`img_${id}`} placeholder={placeholder}
            className={`inline-block ml-2 object-scale-down w-10 h-10 mb-8 bg-gray-200 
            opacity-${mediaDataUrl ? "100" : "0"}`}
            src={mediaDataUrl ?? placeholder} />}

   
    </div>
}