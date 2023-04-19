import { FC, useCallback, useEffect, useState } from "react";
import {useUserContract} from "pix0-react";
import { User} from 'pix0-js';
import { shortenStringTo } from "pix0-react";
import { isConnectedWallet } from "../../utils";

type props = {

    address : string, 

    className? : string, 
}
export const SmUserView : FC <props> = ({
    address, className
}) =>{

    const {getUser} = useUserContract();

    const [user, setUser] = useState<User>();

    const fetchUser = useCallback(async ()=>{

        let u = await getUser(address);
        setUser(u);
    },[address]);

    useEffect(()=>{
        fetchUser();
    },[fetchUser]);

    return <div className={className ?? "inline-block font-bold"}>
        {isConnectedWallet(address) ? <>You</> : 
        <>{user && <div className="text-sm">{`@${user.user_name}`}</div>}
        <div className="text-sm">{shortenStringTo(address,10)}</div></>}
    </div>
}