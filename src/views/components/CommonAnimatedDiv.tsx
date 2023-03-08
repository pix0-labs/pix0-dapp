import { FC } from "react";
import { motion } from 'framer-motion';
import { COMMON_PANEL_CLASS_NAME } from "../modules/config";

type props = {

    children : any,

    className? : string, 
}

export const CommonAnimatedDiv : FC <props> = ({
    children, className
}) =>{

    return <motion.div initial={{ opacity: 0, scale: 0.5 }}
    className={className ?? COMMON_PANEL_CLASS_NAME}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}>{children}</motion.div>
}