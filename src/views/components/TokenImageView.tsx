import { FC } from "react";
import placeholder from '../../images/placeholder2.png';

type props = {

    image? : string, 

    className? : string, 
}

export const TokenImageView : FC <props> = ({
    image, className
}) =>{

    return image ? <div className={`${className ?? "img_container"} mx-auto`}><a href={image}
    target="_blank"><img src={image} placeholder={placeholder}/></a></div> :
    <div className={`${className ?? "img_container"} mx-auto`}><img src={placeholder} placeholder={placeholder}/></div> 
}