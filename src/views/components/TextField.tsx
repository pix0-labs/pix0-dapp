import { FC, ReactElement } from "react";

type Props = {

    className? : string,
    
    id? : string,
    
    type? : string,
    
    placeholder?: string, 
 
    label? : string| ReactElement, 

    defaultValue? : string,

    autoComplete? : string,

    onChange? : (e: any ) => void,

    onClick? : (e: React.FormEvent<HTMLInputElement>) => void,
 
    onDoubleClick? : (e: React.FormEvent<HTMLInputElement>) => void,

    labelInline? : boolean,

    labelRightMargin? : string,

    value? : string, 

    readOnly? : boolean,
 
}

export const commonTextfieldClassName = (w? : string ) =>{

    return `shadow appearance-none border rounded ${w ?? "w-full"} py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2`;

}


export const TextField : FC <Props>= ({
    className, id, type, placeholder, label, defaultValue,
    onChange, onClick, onDoubleClick, autoComplete, labelInline, 
    value, labelRightMargin, readOnly
}) =>{

    return  <><label style={labelRightMargin ? {marginRight:labelRightMargin} : undefined}
    className={`text-gray-300 text-md font-bold mb-2${(labelInline ? " inline-block" : " block")}`} 
    htmlFor={id}>{label}</label><input className={ className ?? 
    commonTextfieldClassName()} defaultValue={defaultValue} value={value}
    id={id} type={type ?? "text"} placeholder={placeholder ?? ""} autoComplete={autoComplete}
    onChange={onChange} onClick={onClick} onDoubleClick={onDoubleClick} readOnly={readOnly}/></>

}