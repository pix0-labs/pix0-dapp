import { FC } from "react";
import { FiGift, FiImage, FiShoppingCart, FiTool} from 'react-icons/fi';
import usePage from "../hooks/usePage";
import { Page } from "../sm/PageActions";
import logo from '../images/pix0_logo1.png';


export const SideBar : FC = () =>{

    const {setPage, isPage} = usePage();

    const classNamesIfPageIs = ( page : Page) => {

        return isPage(page) ? "text-sky-300 bg-gray-800 px-2 round mx-1 rounded-2xl" : 
        "cursor-pointer text-gray-400 hover:text-orange-300 px-2 bg-stone-800 mx-1 rounded-2xl"

    }

    return <div className="h-auto flex-1 flex overflow-hidden">
    <nav aria-label="Sidebar" className="hidden lg:block flex-shrink-0 bg-zinc-900 h-screen">
        <div className="w-64 flex space-y-16 flex-col p-1">

            <div className="m-1">
                <img src={logo} style={{width:"120px"}} className="h-auto ml-4"/>
            </div>

            <a onClick={()=>{
                setPage(Page.Collectibles);
            }} className={classNamesIfPageIs(Page.Collectibles)}>
                <div className="inline-flex text-left pl-2">
                <FiGift className="mr-2 mt-1"/>For Collectors</div>
            </a>

            <a onClick={()=>{
                setPage(Page.CreateCollection);
            }} className={classNamesIfPageIs(Page.CreateCollection)}>
                   <div className="inline-flex text-left pl-2">
                   <FiImage className="mr-2 mt-1"/>For Creators</div>
            </a>

            <a onClick={()=>{
                setPage(Page.MintNFT);
            }} className={ 
                classNamesIfPageIs(Page.MintNFT)}>
                <div className="inline-flex text-left pl-2">
                <FiTool className="mr-2 mt-1"/>Tools</div>
            </a>

            <a onClick={()=>{
                setPage(Page.Market);
            }} className={classNamesIfPageIs(Page.Market)}>
                <div className="inline-flex text-left pl-2">
                <FiShoppingCart className="mr-2 mt-1"/>Market</div>
            </a>
        </div>
    </nav>
</div>
}