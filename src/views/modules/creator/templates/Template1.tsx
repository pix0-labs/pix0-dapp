import { FC } from "react";
import { MintPage, mintPageLogoUrl} from 'pix0-js';
import { CommonAnimatedDiv } from "../../../components/CommonAnimatedDiv";

type props = {

    mintPage : MintPage,
}

export const Template1 : FC <props> = ({
    mintPage
}) =>{

    return <CommonAnimatedDiv className="rounded p-1 bg-gray-800 text-gray-100 m-2 mx-auto h-full w-4/5">

    <div className="p-2 mx-auto w-3/5 bg-gray-700 rounded m-10 mb-10">
        <div className="text-gray-100 text-sm font-bold mb-4 mx-auto text-center">{mintPage.collection_name}</div>
        <div className="text-gray-100 text-sm font-bold mb-4">
            <img src={mintPageLogoUrl(mintPage)} className="rounded-full mx-auto"
            style={{maxWidth:"300px",maxHeight:"200px"}}/>
        </div>
        <div className="text-gray-100 text-sm font-bold mb-4 mx-auto text-center">{mintPage.description}</div>
    
    </div>
   
    </CommonAnimatedDiv>
}