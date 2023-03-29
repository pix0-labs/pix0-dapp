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
         <div className="bg-gray-700 p-2 text-left w-3/5 shadow-md rounded-3xl ml-2">
         <div className="inline-block p-2 rounded-3xl bg-gray-500 mx-2">Your Collectibles</div>
         <div className="inline-block p-2 rounded-3xl bg-gray-800 mx-2">Mint NFTs from Neighborhood</div>
         <div className="inline-block p-2 rounded-3xl bg-gray-800 mx-2">Simple Mint</div>
        </div>
   
        <NFTsView/>
    </motion.div>
}