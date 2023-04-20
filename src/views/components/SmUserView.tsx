import { FC, useCallback, useEffect, useState } from "react";
import {useUserContract} from "pix0-react";
import { User} from 'pix0-js';
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

    const fetchUser = useCallback(async ()=>{

        let u = await getUser(address);
        setUser(u);
    },[address]);

    useEffect(()=>{
        fetchUser();
    },[fetchUser]);

    return <div className={className ?? "inline-block font-bold items-center"} title={`${user?.first_name} ${user?.last_name}`}>
        {isConnectedWallet(address) ? <>You</> : 
        <>{user && <div className={`text-sm${flat ? " inline mt-1 float-left mr-2" :""}`}>{`@${user.user_name}`}</div>}
        <div className={`text-sm${flat ? " inline bg-gray-600 pl-1 pr-1 rounded" :""}`}>{shortenStringTo(address,8)}</div></>}
    </div>
}