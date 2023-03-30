import { FC, useState } from "react";
import { motion } from 'framer-motion';
import { NFTsView } from "./NFTsView";
import { TopMenu } from "./TopMenu";
import { COMMON_PANEL_CLASS_NAME } from "../config";
import { MintFromNBH } from "./MintFromNBH";
import { SimpleMintForm } from "./SimpleMintForm";

export enum ViewType {

    COLLECTIBLES, 

    MINT_FROM_NBH,

    SIMPLE_MINT,
}


export const CollectiblesView : FC = () =>{

    const [viewType, setViewType] = useState<ViewType>(ViewType.COLLECTIBLES);


    const switchView = () =>{

        switch(+viewType) {

            case ViewType.COLLECTIBLES :
                return <NFTsView/>

            case ViewType.MINT_FROM_NBH :
                return <MintFromNBH/>

            case ViewType.SIMPLE_MINT :
                return <SimpleMintForm setViewType={setViewType}/>

            default :
                return <NFTsView/>
        }
    }

    return <motion.div 
    className={COMMON_PANEL_CLASS_NAME}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}>
        <TopMenu setViewType={setViewType} viewType={viewType}/>
        {switchView()}
    </motion.div>
}