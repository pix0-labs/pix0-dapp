import { FC } from "react";
import { ViewType } from "./MainView";
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

    const {setPage} = usePage();


    const bgc = (vtype : ViewType) => {

        return vtype === viewType ? "bg-gray-500" : "bg-gray-800";
    }   


    return <div className="bg-gray-700 p-2 text-left w-full shadow-xl rounded mr-2 mb-2">
    <motion.div className={`cursor-pointer inline-block p-2 rounded-3xl ${bgc(ViewType.MARKET)} mx-2`}
     onClick={()=>{
        if (setViewType)
            setViewType(ViewType.MARKET);
        setPage(Page.Market, ViewType.MARKET);
     }}   
     transition={{ duration: 0.8, type: "tween" }}>Market</motion.div>
    <motion.div className={`cursor-pointer inline-block p-2 rounded-3xl ${bgc(ViewType.YOUR_BUY_OFFERS)} mx-2`}
     onClick={()=>{
        if (setViewType)
            setViewType(ViewType.YOUR_BUY_OFFERS);
        setPage(Page.Market, ViewType.YOUR_BUY_OFFERS);
     }}   
     transition={{ duration: 0.8, type: "tween" }}>Your Buy Offers</motion.div>
    <motion.div className={`cursor-pointer inline-block p-2 rounded-3xl ${bgc(ViewType.YOUR_SELL_OFFERS)} mx-2`}
     onClick={()=>{
        if (setViewType)
            setViewType(ViewType.YOUR_SELL_OFFERS);
        setPage(Page.Market, ViewType.YOUR_SELL_OFFERS);

     }}   
     transition={{ duration: 0.8, type: "tween" }}>Your Sell Offers</motion.div>
  
 
   </div>

}