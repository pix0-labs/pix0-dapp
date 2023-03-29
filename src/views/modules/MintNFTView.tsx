import { FC } from "react";
import { motion } from 'framer-motion';
import { COMMON_PANEL_CLASS_NAME } from "./config";


export const MintNFTView : FC = () =>{

    return <motion.div 
    className={COMMON_PANEL_CLASS_NAME}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}>Mint An NFT<br/>
    <p>You can mint NFT here...</p>
    </motion.div>
}