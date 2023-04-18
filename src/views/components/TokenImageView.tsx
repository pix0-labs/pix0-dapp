import { FC } from "react";
import placeholder from '../../images/placeholder2.png';

type props = {

    image? : string, 

    className? : string, 

    style? : React.CSSProperties,
}

export const TokenImageView : FC <props> = ({
    image, className, style 
}) =>{

    return image ? <div className={`${className ?? "img_container"} mx-auto`} style={style}><a href={image}
    target="_blank"><img src={image} placeholder={placeholder}/></a></div> :
    <div className={`${className ?? "img_container"} mx-auto`}  style={style}><img src={placeholder} placeholder={placeholder}/></div> 
}