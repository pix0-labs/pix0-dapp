import { FC } from "react";
import { motion } from 'framer-motion';


type props = {

    children? : any 

    transitionDuration? : number, 
}

export const CommonMessageDiv : FC <props> = ({
    children, transitionDuration
}) =>{

    return <motion.div 
    className="bg-gray-500 rounded-3xl p-4 w-96 mx-auto mt8"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: transitionDuration ?? 1.2 }}>
    {children}
    </motion.div>
}