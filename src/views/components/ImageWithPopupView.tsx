import { FC } from "react";
import { Popup } from 'reactjs-popup';
import { PopupPosition } from 'reactjs-popup/dist/types';

type props = {

    src? : string,

    imageIconStyle? : React.CSSProperties,

    imageIconClassName? : string, 

    style? : React.CSSProperties,

    className? : string, 

    arrowPosition?: PopupPosition|PopupPosition[],

}

export const ImageWithPopupView : FC <props> = ({
    src, style, className, arrowPosition, imageIconClassName, imageIconStyle
}) =>{

    const imgIcon = <img src={src} style={imageIconStyle ?? {maxWidth:"36px"}}
    className={imageIconClassName} title="Click to view larger version"/>

    const bigImage = <img src={src} style={style ?? {width:"295px",height:"auto"}}
    className={className}/>

    return <Popup contentStyle={{background:"#222",minWidth:"300px", maxWidth:"460px"}} 
    arrowStyle={{color:"#222", border:"1px"}} 
    className="bg-gray-800 text-gray-100 w-64 p-4 m-4"
    trigger={imgIcon} position= {arrowPosition ?? "bottom center"}>
    <div className="p-2 text-center">{bigImage}</div>
    </Popup>

}