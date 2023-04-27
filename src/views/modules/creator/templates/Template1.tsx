import { FC } from "react";
import { MintPage} from 'pix0-js';
import { CommonAnimatedDiv } from "../../../components/CommonAnimatedDiv";

type props = {

    mintPage : MintPage,
}

export const Template1 : FC <props> = ({
    mintPage
}) =>{

    return <CommonAnimatedDiv className="rounded p-1 bg-gray-800 text-gray-100 mt-4">
    <div className="text-gray-100 text-sm font-bold">{mintPage.collection_name}</div>
    </CommonAnimatedDiv>
}