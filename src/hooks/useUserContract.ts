import {useCallback, useState, useEffect} from 'react';
import * as pix0 from 'pix0-js';
import { WalletConnectionStorage } from 'pix0-react';
import {useUserContract as useUserContractReact} from 'pix0-react';

export function useUserContract()  {

    const {getUser, createUser, updateUser} = useUserContractReact();

    const [currentUser, setCurrentUser] = useState<pix0.User>();


    const fetchCurrentUser = useCallback(async ()=>{

        let w = WalletConnectionStorage.get();

        let u = await getUser(w?.accounts[0].address);
        console.log("fetch user for ", w?.accounts[0].address, u);

        setCurrentUser(u);

    },[WalletConnectionStorage.get()]);

    useEffect(()=>{

        fetchCurrentUser();

    },[fetchCurrentUser]);

    return {getUser, currentUser, fetchCurrentUser, createUser, updateUser};

}

export default useUserContract;

