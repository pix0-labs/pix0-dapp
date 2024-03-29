import { FC } from "react";
import { ViewType } from "./CollectiblesView";
import { motion } from "framer-motion";
import usePage from "../../../hooks/usePage";
import { Page } from "../../../sm/PageActions";

type props = {

    viewType? : ViewType,

    setViewType? : (viewType : ViewType) => void, 
}

export const TopMenu : FC <props> = ({
    viewType, setViewType
}) =>{

    const bgc = (vtype : ViewType) => {

        return vtype === viewType ? "bg-gray-500" : "bg-gray-800";
    }   

    const {setPage} = usePage();


    return <div className="bg-gray-700 p-2 text-left w-full shadow-xl rounded mr-2">
    <motion.div className={`cursor-pointer inline-block p-2 rounded-3xl ${bgc(ViewType.COLLECTIBLES)} mx-2`}
     onClick={()=>{
        if (setViewType)
            setViewType(ViewType.COLLECTIBLES);

        setPage(Page.Collectibles, ViewType.COLLECTIBLES);

     }}   
     transition={{ duration: 0.8, type: "tween" }}>Your Collectibles</motion.div>
    <motion.div className={`cursor-pointer inline-block p-2 rounded-3xl ${bgc(ViewType.MINT_FROM_NBH)} mx-2`}
     onClick={()=>{
        if (setViewType)
            setViewType(ViewType.MINT_FROM_NBH);

        setPage(Page.Collectibles, ViewType.MINT_FROM_NBH);
        
     }}   
     transition={{ duration: 0.8, type: "tween" }}>Mint From Neighborhood</motion.div>
    <motion.div className={`cursor-pointer inline-block p-2 rounded-3xl ${bgc(ViewType.SIMPLE_MINT)} mx-2`}
     onClick={()=>{
        if (setViewType)
            setViewType(ViewType.SIMPLE_MINT);
        setPage(Page.Collectibles, ViewType.SIMPLE_MINT);

     }}   
     transition={{ duration: 0.8, type: "tween" }}>Simple Mint</motion.div>
 
 
   </div>

}