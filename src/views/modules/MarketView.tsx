import { FC } from "react";
import { motion } from 'framer-motion';
import { COMMON_PANEL_CLASS_NAME } from "./config";

export const MarketView : FC = () =>{

    return <motion.div initial={{ opacity: 0, scale: 0.5 }}
    className={COMMON_PANEL_CLASS_NAME}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}>NFT Marketplace</motion.div>
}