import { FC } from "react";
import { BalanceView } from "pix0-react2-arch-test";
import { FiCopy } from "react-icons/fi";

export const TopBar : FC = () =>{

    return <div className="flex justify-end w-10/12">
    <BalanceView copyIcon={<FiCopy className="ml-2"/>} 
    style={{minWidth:"260px"}}
    className="p-2 bg-gray-600 hover:bg-gray-700 
    rounded-3xl mt-2 mb-2 text-center font-bold text-gray-100 mr-100"/>
    </div>
    
}