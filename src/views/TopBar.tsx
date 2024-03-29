import { FC } from "react";
import { BalanceView } from "./components/BalanceView";
import { FiCopy } from "react-icons/fi";

export const TopBar : FC = () =>{

    return <div className="flex h-16 justify-end w-full m-1 bg-gradient-to-r from-gray-900 
    to-gray-600 p-1 pr-20 rounded-md mr-2">
    <BalanceView copyIcon={<FiCopy className="ml-2"/>} displayDecimals={3}
    style={{minWidth:"320px"}} className="pt-2 bg-gray-800 hover:bg-gray-900 
    rounded-3xl mt-2 mb-2 text-center font-bold text-gray-100 mr-200"/>
    </div>
    
}