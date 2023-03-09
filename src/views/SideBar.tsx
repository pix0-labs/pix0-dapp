import { FC } from "react";
import { FiGift, FiImage, FiShoppingCart, FiTool} from 'react-icons/fi';
import usePage from "../hooks/usePage";
import { Page } from "../sm/PageActions";
import logo from '../images/pix0_logo1.png';


export const SideBar : FC = () =>{

    const {setPage, isPage} = usePage();

    const classNamesIfPageIs = ( page : Page) => {

        return isPage(page) ? "text-sky-300 bg-gray-600 w-32 rounded ml-2 py-1" : 
        "cursor-pointer text-gray-400 hover:text-orange-300 p-2"

    }

    return <div className="h-auto flex-1 flex overflow-hidden">
    <nav aria-label="Sidebar" 
    className="hidden lg:block flex-shrink-0 bg-zinc-900 h-screen">
        <div className="w-64 flex space-y-16 flex-col p-1">

            <div className="m-1">
                <img src={logo} style={{width:"120px"}} className="h-auto ml-4"/>
            </div>

            <a onClick={()=>{
                setPage(Page.Collectibles);
            }} className={classNamesIfPageIs(Page.Collectibles)}>
                <div className="inline-flex text-left w-32 pl-2">
                <FiGift className="mr-2 mt-1"/>Collectibles</div>
            </a>

            <a onClick={()=>{
                setPage(Page.MintNFT);
            }} className={ 
                classNamesIfPageIs(Page.MintNFT)}>
                <div className="inline-flex text-left w-32 pl-2">
                <FiImage className="mr-2 mt-1"/>Mint NFT</div>
            </a>

            <a onClick={()=>{
                setPage(Page.CreateCollection);
            }} className={classNamesIfPageIs(Page.CreateCollection)}>
                   <div className="inline-flex text-left w-32 pl-2">
                    <FiTool className="mr-2 mt-1"/>Create</div>
            </a>

            <a onClick={()=>{
                setPage(Page.Market);
            }} className={classNamesIfPageIs(Page.Market)}>
                <div className="inline-flex text-left w-32 pl-2">
                <FiShoppingCart className="mr-2 mt-1"/>Market</div>
            </a>
        </div>
    </nav>
</div>
}