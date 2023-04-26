import { FC, useEffect, useState, useCallback } from "react";
import {useUserContract} from "pix0-react";
import { User, USE_NFT_AS_PROFILE_IMG} from 'pix0-js';
import { UserIconView } from "./UserIconView";
import { useNftLoader } from "../../hooks/useNftLoader";
import { shortenStringTo } from "pix0-react";
import { isConnectedWallet } from "../../utils";

type props = {

    address : string, 

    className? : string, 

    flat? : boolean,
}

export const SmUserView : FC <props> = ({
    address, className, flat
}) =>{

    const {getUser} = useUserContract();

    const [user, setUser] = useState<User>();

    const [profileImageTokenId, setProfileImageTokenId] = useState("");

    const {image, isImagePlaceHolder} = useNftLoader(profileImageTokenId);

    const fetchUser = useCallback( async () =>{

        let u = await getUser(address);

        setUser(u);

        if (u.profile_image !== undefined && u.profile_image!== null && u.profile_image.pic_type === USE_NFT_AS_PROFILE_IMG){
            setProfileImageTokenId(u.profile_image.value);
        }
        else {

            setProfileImageTokenId("");
        }

    },[address]);

    useEffect(()=>{
        fetchUser();
    },[fetchUser]);

   
    return <div className={className ?? "inline-block font-bold items-center"} title={
        (user?.first_name && user.last_name) ? `${user?.first_name} ${user?.last_name}` : 
        address}>
        {isConnectedWallet(address) ? <>You</> : 
        <>{user && <div className={`text-sm${flat ? " inline mt-1 float-left mr-2" :""}`}>
            {!isImagePlaceHolder() && <UserIconView chosenImageUrl={image} style={{width:"20px",height:"20px"}}
            className="mr-1 inline rounded-full"/>}
            {`@${user.user_name}`}</div>}
        <div className={`text-sm${flat ? " inline bg-gray-600 pl-1 pr-1 rounded" :""}`}>{shortenStringTo(address,8)}</div></>}
    </div>
}