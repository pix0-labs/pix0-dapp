import { FC } from "react";
import { FiGift, FiImage, FiShoppingCart, FiTool} from 'react-icons/fi';
import usePage from "../hooks/usePage";
import { Page } from "../sm/PageActions";
import logo from '../images/pix0_logo1.png';


export const SideBar : FC = () =>{

    const {setPage, isPage} = usePage();

    const classNamesIfPageIs = ( page : Page) => {

        return isPage(page) ? "text-sky-300 bg-gray-700 p-2 rounded-md" : 
        "cursor-pointer text-gray-400 hover:text-orange-300 p-2"

    }

    return <div className="h-screen flex-1 flex overflow-hidden bg-gray-800">
    <nav aria-label="Sidebar" 
    className="hidden lg:block flex-shrink-0 bg-gradient-to-r from-gray-700 to-gray-900 overflow-y-auto h-screen">
        <div className="relative w-30 flex space-y-16 flex-col p-3">

            <div className="m-1.5">
                <img src={logo} className="w-24 h-auto mx-auto"/>
            </div>

            <a onClick={()=>{
                setPage(Page.Collectibles);
            }} className={classNamesIfPageIs(Page.Collectibles)}>
                <div className="inline-flex justify-center w-20">
                    <FiGift/>
                </div>
                <div className="text-center text-xs font-normal">Collectibles</div>
            </a>

            <a onClick={()=>{
                setPage(Page.MintNFT);
            }} className={ 
                classNamesIfPageIs(Page.MintNFT)}>
                <div className="inline-flex justify-center w-20">
                    <FiImage/>
                </div>
                <div className="text-center text-xs font-normal">Mint NFT</div>
            </a>

            <a onClick={()=>{
                setPage(Page.Market);
            }} className={classNamesIfPageIs(Page.Market)}>
                <div className="inline-flex justify-center w-20">
                    <FiShoppingCart/>
                </div>
                <div className="text-center text-xs font-normal">Market</div>
            </a>

            <a onClick={()=>{
                setPage(Page.CreateCollection);
            }} className={classNamesIfPageIs(Page.CreateCollection)}>
                   <div className="inline-flex justify-center w-20">
                    <FiTool/>
                </div>
                <div className="text-center text-xs font-normal">Create</div>
            </a>

        </div>
    </nav>
</div>
}