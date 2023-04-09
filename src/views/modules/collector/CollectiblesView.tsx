import { FC, useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { NFTsView } from "./NFTsView";
import { TopMenu } from "./TopMenu";
import { COMMON_PANEL_CLASS_NAME } from "../config";
import { MintFromNBH } from "./MintFromNBH";
import usePage from "../../../hooks/usePage";
import { SimpleMintForm } from "./SimpleMintForm";

export enum ViewType {

    COLLECTIBLES = 1, 

    MINT_FROM_NBH = 2,

    SIMPLE_MINT = 3,
}


export const CollectiblesView : FC = () =>{

    const [viewType, setViewType] = useState<ViewType>(ViewType.COLLECTIBLES);

    const {param} = usePage();

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

    useEffect(()=>{
        setViewType(param);
    },[param]);

    return <motion.div 
    className={COMMON_PANEL_CLASS_NAME}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}>
        <TopMenu setViewType={setViewType} viewType={viewType}/>
        {switchView()}
    </motion.div>
}