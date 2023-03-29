import { FC } from "react";
import { motion } from "framer-motion";

type props = {

    isVisible? : boolean,

    children? : any, 

    id? : string, 
}

export const AnimatedDiv2 : FC <props> = ({
    isVisible, children, id 
}) =>{


    return  <motion.div className="bg-transparent" 
    animate={{ opacity: isVisible ? 1 : 0, display : isVisible ? "block" : "none" }}
    transition={{ duration: 0.8 }} id={id ?? "animatedDiv"}> 
    {children}
    </motion.div>
}
