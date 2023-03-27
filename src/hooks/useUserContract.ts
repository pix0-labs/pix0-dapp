import {useCallback, useState, useEffect} from 'react';
import * as pix0 from 'pix0-js';
import { WalletConnectionStorage } from 'pix0-react';


export function useUserContract()  {


    const [currentUser, setCurrentUser] = useState<pix0.User>();


    const getUser = async (owner? : string ) : Promise<pix0.User> =>{
        
        let w = WalletConnectionStorage.get();
        if (w !== undefined) {
            return await pix0.getUser( owner ?? w.accounts[0].address , w.queryHandler);
        }

        return await pix0.getUser(owner ?? "");
    }

    const fetchCurrentUser = useCallback(async ()=>{

        let w = WalletConnectionStorage.get();

        let u = await getUser(w?.accounts[0].address);
        console.log("fetch user for ", w?.accounts[0].address, u);

        setCurrentUser(u);

    },[WalletConnectionStorage.get()]);

    useEffect(()=>{

        fetchCurrentUser();

    },[fetchCurrentUser]);

    return {getUser, currentUser, fetchCurrentUser};

}

export default useUserContract;

