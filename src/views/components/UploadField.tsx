import { FC} from 'react';
import { DndProps, DndUploadField } from './DndUploadField';
import { FileUploadField } from './FileUploadField';


type props = DndProps & {
    useDragAndDrop? : boolean
}


export const UploadField : FC <props> =({
    id, label, allowedFileTypes, notToShowError, 
    maxFileSize, onError, uploadAction, 
    uploading, withImagePreview, setMediaCallback, 
    index, onClick, useDragAndDrop, multipleUpload
}) =>{

    return <>
    {useDragAndDrop ? 
    <DndUploadField allowedFileTypes={allowedFileTypes} maxFileSize={maxFileSize}
    multipleUpload={multipleUpload} index={index} id={id}  
    setMediaCallback={setMediaCallback} withImagePreview={withImagePreview}
    /> 
    : 
    <FileUploadField id={id}
    label={label} allowedFileTypes={allowedFileTypes}
    notToShowError={notToShowError} maxFileSize={maxFileSize}
    onError={onError} uploadAction={uploadAction} uploading={uploading}
    withImagePreview={withImagePreview} setMediaCallback={setMediaCallback}
    index={index} onClick={onClick} />}
    </>
}
