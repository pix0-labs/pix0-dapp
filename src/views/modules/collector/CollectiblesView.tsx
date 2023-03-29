import { FC, useState } from "react";
import { motion } from 'framer-motion';
import { NFTsView } from "./NFTsView";
import { TopMenu } from "./TopMenu";
import { COMMON_PANEL_CLASS_NAME } from "../config";

export enum ViewType {

    COLLECTIBLES, 

    MINT_FROM_NBH,

    SIMPLE_MINT,
}


export const CollectiblesView : FC = () =>{

    const [viewType, setViewType] = useState<ViewType>(ViewType.COLLECTIBLES);


    return <motion.div 
    className={COMMON_PANEL_CLASS_NAME}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}>
        <TopMenu setViewType={setViewType} viewType={viewType}/>
        <NFTsView/>
    </motion.div>
}