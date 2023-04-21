import {FC, useCallback, useEffect, useState} from 'react';
import { useUserContract } from 'pix0-react';
import { useNftLoader } from '../../../hooks/useNftLoader';
import { UserIconView } from '../../components/UserIconView';
import { shortenStringTo, copy } from 'pix0-react';
import { FaCopy } from 'react-icons/fa';
import { PulseLoader as Loader } from 'react-spinners';
import { User, USE_NFT_AS_PROFILE_IMG} from 'pix0-js';

export type props = {

    address : string,
}

export const UserView : FC <props> = ({
    address
}) =>{

    const {getUser} = useUserContract();

    const [user,setUser] = useState<User>();

    const [profileImage, setProfileImage] = useState<string>();

    const [loading, setLoading] = useState(false);

    const {image} = useNftLoader(profileImage ?? "");

    const fetchUser = useCallback(async ()=>{

        setLoading(true);

        try {
            let u = await getUser(address);
            setUser(u);    
       
            if ( u.profile_image?.pic_type === USE_NFT_AS_PROFILE_IMG) {
                setProfileImage(u.profile_image.value);
            }
        }
        catch(e: any){}
        setLoading(false);
    },[address]);

    useEffect(()=>{
        fetchUser();
    },[fetchUser]);

    return <div style={{width:"98%"}} className="p-2 mx-auto bg-slate-700 rounded text-gray-100 text-center">
        {loading ? <Loader color="white" size={10}/> :
         <>{profileImage && <div className="mb-4">
        <UserIconView chosenImageUrl={image} 
        className="w-24 h-24 rounded-full mx-auto"/>
        </div>}
        <div className="mb-4">
        Wallet:<span className="ml-2 font-bold">{shortenStringTo(user?.owner ?? "",10)}</span>
        <span className="ml-2"><button className="bg-transparent p-1 rounded w-8 h-8 
        active:bg-gray-800 transition duration-3000" 
        onClick={(e)=>{
            e.preventDefault();
            copy(user?.owner ?? "");
        }}><FaCopy className="inline"/></button></span>
        </div>
        <div className="mb-4">
        Username:<span className="ml-2 font-bold">@{user?.user_name}</span>
        </div>
        <div className="mb-4">
        Name:<span className="ml-2 font-bold">{user?.first_name} {user?.last_name}</span>
        </div>
        {user?.bio && <div className="mb-4">
        Bio:<span className="ml-2 font-bold">{user?.bio}</span>
        </div>}</>}
    </div>
}