import { FC } from "react";
import placeholder from '../../images/placeholder2.png';

type props = {

    image? : string, 

    className? : string, 

    style? : React.CSSProperties,

    nonClickableForLargerImage? : boolean,
}

export const TokenImageView : FC <props> = ({
    image, className, style , nonClickableForLargerImage
}) =>{

    return image ? <div className={`${className ?? "img_container"} mx-auto`} style={style}>
    <a href={nonClickableForLargerImage ? undefined :image}
    target="_blank"><img src={image} placeholder={placeholder}/></a></div> :
    <div className={`${className ?? "img_container"} mx-auto`}  style={style}><img src={placeholder} placeholder={placeholder}/></div> 
}