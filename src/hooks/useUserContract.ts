import {useCallback, useState, useEffect} from 'react';
import * as pix0 from 'pix0-js';
import { WalletConnectionStorage } from 'pix0-react';
import {useUserContract as useUserContractReact} from 'pix0-react';

export function useUserContract()  {

    const {getUser, createUser, updateUser, getUserProfileImageUrl} = useUserContractReact();

    const [currentUser, setCurrentUser] = useState<pix0.User>();

    const [loading, setLoading] = useState(false);

    const fetchCurrentUserProfileImage = async () : Promise<string|undefined>=>{

        let w = WalletConnectionStorage.get();

        let img = await getUserProfileImageUrl(w?.accounts[0].address);

        return img; 
    };

    const fetchCurrentUser = useCallback(async ()=>{

        if ( currentUser === undefined) {

            setLoading(true);

            let w = WalletConnectionStorage.get();

            let u = await getUser(w?.accounts[0].address);
            //console.log("fetch user for ", w?.accounts[0].address, u);
    
            setCurrentUser(u);
    
            setTimeout(()=>{
                setLoading(false);
            }, 300);
        }
     
    },[WalletConnectionStorage.get()]);

    useEffect(()=>{

        fetchCurrentUser();

    },[fetchCurrentUser]);

    return {getUser, currentUser, fetchCurrentUser, createUser, updateUser, fetchCurrentUserProfileImage, loading};

}

export default useUserContract;

