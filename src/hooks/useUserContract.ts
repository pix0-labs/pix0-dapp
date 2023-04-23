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


    const isProfileImageUsing = (tokenId : string, _contractAddr? : string ) : boolean =>{

        if (currentUser?.profile_image !== undefined && currentUser.profile_image.pic_type === pix0.USE_NFT_AS_PROFILE_IMG){

            return currentUser.profile_image.value === tokenId;
        }
        else {

            return false;
        }

    }

    const fetchCurrentUser = useCallback(async ()=>{

        if ( currentUser === undefined) {

            setLoading(true);

            let w = WalletConnectionStorage.get();
            try {

                let u = await getUser(w?.accounts[0].address);
             
                setCurrentUser(u);
        
                setTimeout(()=>{
                    setLoading(false);
                }, 300);
            }
            catch(e : any){
                //console.log("fetch.user.error::", e);
            }
           
        }
     
    },[WalletConnectionStorage.get(), currentUser]);

    useEffect(()=>{

        fetchCurrentUser();

    },[fetchCurrentUser]);



    return {getUser, currentUser, fetchCurrentUser, createUser, 
        updateUser, fetchCurrentUserProfileImage, loading, isProfileImageUsing};

}

export default useUserContract;

