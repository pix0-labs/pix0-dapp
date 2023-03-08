import { FC } from "react";
import { motion } from 'framer-motion';
import { NFTsView } from "./NFTsView";
import { COMMON_PANEL_CLASS_NAME } from "./config";

export const CollectiblesView : FC = () =>{

    return <motion.div 
    className={COMMON_PANEL_CLASS_NAME}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}>
        <NFTsView/>
    </motion.div>
}