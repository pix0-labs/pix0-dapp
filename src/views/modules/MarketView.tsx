import { FC} from "react";
import { CommonAnimatedDiv } from "../components/CommonAnimatedDiv";
import { useUserContract } from "../../hooks/useUserContract";

export const MarketView : FC = () =>{

    const {currentUser} = useUserContract();


    return <CommonAnimatedDiv>NFT Marketplace
        <p>User :{currentUser?.owner}</p>
        <p>First Name :{currentUser?.first_name}</p>
        <p>Last Name :{currentUser?.last_name}</p>
        

    </CommonAnimatedDiv>
}