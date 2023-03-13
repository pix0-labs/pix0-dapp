import { FC } from "react";
import { Popup } from 'reactjs-popup';
import { PopupPosition, EventType } from 'reactjs-popup/dist/types';

type props = {

    src? : string,

    imageIconStyle? : React.CSSProperties,

    imageIconClassName? : string, 

    style? : React.CSSProperties,

    className? : string, 

    arrowPosition?: PopupPosition|PopupPosition[],

    on? : EventType|EventType[], 

    iconTitle? : string, 

}

export const ImageWithPopupView : FC <props> = ({
    src, style, className, arrowPosition, imageIconClassName, imageIconStyle, on, iconTitle
}) =>{

    const imgIcon = <img src={src} style={imageIconStyle ?? {maxWidth:"36px"}}
    className={imageIconClassName} title={iconTitle ?? "View larger version"}/>

    const bigImage = <img src={src} style={style ?? {width:"295px",height:"auto"}}
    className={className}/>

    return <Popup contentStyle={{background:"#222",minWidth:"300px", maxWidth:"460px"}} 
    arrowStyle={{color:"#222", border:"1px"}} on={on ?? "click"}
    className="bg-gray-800 text-gray-100 w-64 p-4 m-4"
    trigger={imgIcon} position= {arrowPosition ?? "bottom center"}>
    <div className="p-2 text-center">{bigImage}</div>
    </Popup>

}