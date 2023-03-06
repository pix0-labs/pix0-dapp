import { FC } from "react";
import { motion } from 'framer-motion';

export const CreateCollectionView : FC = () =>{

    return <motion.div initial={{ opacity: 0, scale: 0.5 }}
    style={{width:"95%", margin:"10px", 
    color:"white", background:"#070", borderRadius:"10px", padding:"10px"}}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}>Create Your Collection!!</motion.div>
}