import { FC, useCallback, useEffect, useState } from "react";
import { useUserContract } from "../../hooks/useUserContract";
import { FcBusinessman} from 'react-icons/fc';

type props = {

    className? : string ,
}

export const UserIconView : FC <props> = ({
    className
}) =>{

    const {fetchCurrentUserProfileImage} = useUserContract();

    const [imageUrl, setImageUrl] = useState<string>();

    const fetchImage = useCallback(async  () =>{
        let img = await fetchCurrentUserProfileImage();
        setImageUrl(img);
    },[]);

    useEffect(()=>{
        fetchImage();
    },[]);

    return (imageUrl ? <img src={imageUrl} className={className}/> :
    <FcBusinessman className={className}/>);
}