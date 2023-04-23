import React, { FC, useCallback, useEffect, useState } from "react";
import { useUserContract } from "../../hooks/useUserContract";
import { FcBusinessman} from 'react-icons/fc';

type props = {

    className? : string ,

    style? : React.CSSProperties,

    chosenImageUrl? : string, 

    refreshAfter? : number, 
}

export const UserIconView : FC <props> = ({
    className, style, chosenImageUrl, refreshAfter 
}) =>{

    const {fetchCurrentUserProfileImage} = useUserContract();

    const [imageUrl, setImageUrl] = useState<string>();

    const fetchImage = useCallback(async  () =>{
        let img = await fetchCurrentUserProfileImage();
        setImageUrl(img);
    },[]);
    

    useEffect(()=>{

        if ( chosenImageUrl === undefined) {
            fetchImage();
        }
        else {
            setImageUrl(chosenImageUrl);
        }
    },[chosenImageUrl])

    useEffect(()=>{

        if ( refreshAfter ) {

            setTimeout(()=>{
                fetchImage();
            },refreshAfter);
        }

    },[refreshAfter]);

    return (imageUrl ? <img src={imageUrl} className={className} style={style}/> :
    <FcBusinessman className={className} style={style}/>);
}