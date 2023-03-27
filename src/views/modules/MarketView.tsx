import { FC, useState, useEffect, useCallback } from "react";
import { CommonAnimatedDiv } from "../components/CommonAnimatedDiv";
import { useUserContract } from "pix0-react";
import { User} from 'pix0-js';

export const MarketView : FC = () =>{

    const [user, setUser] = useState<User>();

    const {getUser} = useUserContract();

    const fetchUser = useCallback(async ()=>{
        let u = await getUser();
        setUser(u);

        console.log("User:::", u);
    },[]);

    useEffect(()=>{
        fetchUser();
    },[]);

    return <CommonAnimatedDiv>NFT Marketplace
        <p>User :{user?.owner}</p>

    </CommonAnimatedDiv>
}