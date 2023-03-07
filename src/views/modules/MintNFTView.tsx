import { FC } from "react";
import { motion } from 'framer-motion';
import { COMMON_PANEL_CLASS_NAME } from "./config";
import { MintButton } from "pix0-react2-arch-test";

export const MintNFTView : FC = () =>{

    return <motion.div 
    className={COMMON_PANEL_CLASS_NAME}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}>Mint An NFT<br/>
    <p> <MintButton collection_owner="archway12pcytur9del2t5wm93t8kuqakvf9yk9wzt4w0x" collection_name='Test NFT Collection 2'
      collection_symbol='TNFT2'/></p>
    </motion.div>
}