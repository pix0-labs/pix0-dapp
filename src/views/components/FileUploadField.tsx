import { PulseLoader as Spinner } from 'react-spinners';
import { FC , useState} from "react";
import { FcDisapprove} from 'react-icons/fc';
import { CommonAnimatedDiv } from './CommonAnimatedDiv';
import placeholder from '../../images/placeholder100.svg';

export type Props = {
    label? : string,
    
    id? : string,

    allowedFileTypes? : string[],
    
    maxFileSize? : number, 

    onError?: (error : Error) => void,

    uploadAction? : (media: {
        mediaDataUrl? : string,
        contentType?: string,
    }) => void, 

    uploading? : boolean,

    withImagePreview? : boolean,

    setMediaCallback? : (media: {
        mediaDataUrl? : string,
        contentType?: string,
        fileName? : string, 
    }, index? : number ) => void, 

    index? : number,

    notToShowError? : boolean,

    onClick? : (e : any) => void, 
}


export   const checkIfFileValid = (file : any, 
    maxFileSize? : number, 
    allowedFileTypes? : string[],
    setError? : (error : Error)=> void, onError? : (e : Error)=>void ) : boolean => {

    if ( file === undefined) {

        let e = new Error("File is undefined!");
        if ( setError)
            setError(e);

        if ( onError) {
            onError(e );
            return false;
        }
    }
    let aFileTypes = allowedFileTypes ?? ["image/png", "image/jpeg", "image/jpg", "image/gif"/*,"video/mp4"*/];

    const isValid = aFileTypes.indexOf(file.type) !== -1  ;
  
    if (!isValid ) {

        let e = new Error(`Invalid file type ${file.type}`);
        if ( setError)
            setError(e);

        if ( onError) {
            onError( e);
            return false;
        }
    }
  
    let allowedMax = (maxFileSize ?? 2*1024*1024);
    const isLtAllowed = file.size < allowedMax;
  
    if (!isLtAllowed) {
   
        let e = new Error(`File size ${file.size} has exceeded max ${allowedMax}`);
        
        if ( setError)
            setError(e);

        if ( onError) {
            onError( e );
            return false;
        }
   
    }
  
    let b = (isValid && isLtAllowed);

    return b;
}


export const FileUploadField : FC <Props> = ({
    id, label, allowedFileTypes, notToShowError, 
    maxFileSize, onError, uploadAction, 
    uploading, withImagePreview, setMediaCallback, 
    index, onClick 
}) =>{

    const [mediaDataUrl, setMediaDataUrl] = useState<string>();

    const [contentType, setContentType] = useState<string>();

    const [error, setError] = useState<Error>();


    const setErrorNow= (e: Error) =>{

        if ( !notToShowError) {

            setError(e);
            setTimeout(()=>{
                setError(undefined);
            },5000);
      
        }
    }


    const handleMediaDataUrl = async  (file : any ) =>{

        if (file === undefined) 
            return;

        if (!checkIfFileValid(file, maxFileSize, allowedFileTypes, setErrorNow, onError)){            
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

   
    const onChange = async () =>{

        if ( document !== null) {

            const selectedFileInput = document.getElementById(id ?? "fileInput") as any;
            let selectedFile = selectedFileInput.files[0];
            await handleMediaDataUrl(selectedFile);
    
        }
      
    }


    return <div className="hover:bg-gray-700 bg-gray-800 hover:cursor-pointer inline-block pt-4 pb-4 pl-2 pr-4 rounded">
    <CommonAnimatedDiv className="text-red-400 text-xs text-left" visible={error!==undefined}
    dismissAfterInSeconds={10}><FcDisapprove className="inline-block mr-2"/>{error?.message}</CommonAnimatedDiv>
    <div className="inline-block text-white">{label &&<label htmlFor={id ?? "fileInput"} 
    className="form-label inline-block mb-2 text-gray-100 font-bold">{label}</label>}
    <input className="form-control inline w-full px-3 py-1.5 text-base
    font-normal bg-gray text-gray-100 bg-clip-padding
    border border-solid border-gray-500 rounded
    transition ease-in-out m-0 focus:text-gray-300 
    focus:border-blue-600 focus:outline-none" 
    type="file" id={id ?? "fileInput"} onChange={ ()=>{
        onChange();
    }} onClick={(e)=>{
        setMediaDataUrl(undefined);
        setContentType(undefined);
        if ( onClick )
            onClick(e);
    }}/>
    </div>
    {uploadAction && <>
    <button title="Upload..." disabled={uploading} 
    className={`text-sm ml-4 p-2 min-w-32 font-bold ml-4 p-2 mb-2 
    bg-gray-500 rounded-3xl text-white ${(mediaDataUrl ? 'opacity-100' : 'opacity-0')}`} 
    onClick={()=>{
        uploadAction({mediaDataUrl: mediaDataUrl, contentType : contentType});
    }}>{uploading ? <Spinner/> : 
    <><i className="fa fa-cloud-upload mr-2" aria-hidden="true"/>Upload</>}</button>

    <button title="Cancel" disabled={uploading} 
    className={`text-sm ml-4 p-2 min-w-32 font-bold ml-4 p-2 mb-2 
    bg-red-900 rounded-3xl text-white ${(mediaDataUrl ? 'opacity-100' : 'opacity-0')}`} 
    onClick={()=>{
        setMediaDataUrl(undefined);
        setContentType(undefined);
    }}> 
    <i className="fa fa-times" aria-hidden="true"/>Cancel</button></>}
    { withImagePreview  && <img id={`img_${id}`} placeholder={placeholder}
    className={`ml-2 object-scale-down w-14 h-14 inline-block bg-gray-200 opacity-${mediaDataUrl ? "100" : "0"}`} 
    src={mediaDataUrl ?? placeholder} />}
    </div>
    
}