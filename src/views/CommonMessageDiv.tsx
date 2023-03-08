import { FC } from "react";
import { motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';


type props = {

    children? : any 

    transitionDuration? : number, 
}

export const CommonMessageDiv : FC <props> = ({
    children, transitionDuration
}) =>{

    return <motion.div 
    className="bg-cyan-800 rounded-3xl p-4 w-3/5 mx-auto mt-20"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: transitionDuration ?? 1.2 }}>
    <FiAlertCircle style={{marginRight:"4px", display:"inline"}}/>{children}
    </motion.div>
}