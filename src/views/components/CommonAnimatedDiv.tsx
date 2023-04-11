import { FC , useEffect, useState} from "react";
import { motion } from 'framer-motion';
import { COMMON_PANEL_CLASS_NAME } from "../modules/config";

type props = {

    children : any,

    className? : string, 

    style? : React.CSSProperties,

    visible? : boolean,

    dismissAfterInSeconds? : number, 
}

export const CommonAnimatedDiv : FC <props> = ({
    children, className, visible, dismissAfterInSeconds, style 
}) =>{

    const [isVisible, setIsVisible] = useState(true);

    useEffect(()=>{

        if ( visible !== undefined) {

            setIsVisible(visible);
        }

    },[visible]);


    const handleDismiss = () => {

        if (dismissAfterInSeconds) {

            setTimeout(()=>{
                setIsVisible(false);
            },dismissAfterInSeconds * 1000);
        }
    };


    return <>{ isVisible && <motion.div initial={{ opacity: 0, scale: 0.5 }}
    className={className ?? COMMON_PANEL_CLASS_NAME} style={style}
    animate={{ opacity: 1, scale: 1 }}  onAnimationComplete={handleDismiss}
    transition={{ duration: 0.5 }}>{children}</motion.div>}</>
}