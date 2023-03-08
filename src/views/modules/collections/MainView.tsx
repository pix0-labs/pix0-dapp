import { FC } from "react";
import { CommonAnimatedDiv } from "../../components/CommonAnimatedDiv";
import { CollectionsView } from "./CollectionsView";

export const MainView : FC = () =>{

    return <CommonAnimatedDiv>
        <CollectionsView/>
    </CommonAnimatedDiv>
}