import { FC , useState, useEffect} from "react";
import { FiGift, FiShoppingCart} from 'react-icons/fi';
import { FcNext } from "react-icons/fc";
import { IoCreateOutline} from 'react-icons/io5';
import { ViewType as CollectionViewType } from "./modules/creator/CollectionsView";
import { ViewType as CollectiblesViewType} from "./modules/collector/CollectiblesView";
import { ViewType as MarketViewType } from "./modules/market/MainView";
import usePage from "../hooks/usePage";
import { Page } from "../sm/PageActions";
import logo from '../images/pix0_logo1.png';


export const SideBar : FC = () =>{


    const expandSubMenu = (id : string) =>{

        const submenu = document.getElementById(id);

        submenu?.classList.toggle("hidden");
    }


    const {setPage, isPage, page, param} = usePage();

    const [currentPage, setCurrentPage] = useState<{page? : Page, param? : any}>();

    useEffect(()=>{

        setCurrentPage({
            page : page ,
            param : param, 
        })
        //console.log(page, param);
    },[page, param]);


    const submenuClasses = "block text-gray-300 w-48 hover:text-gray-100 hover:bg-gray-600 p-2 text-sm";

    const submenuClassesSel = "block text-gray-300 w-48 hover:text-gray-100 bg-gray-600 p-2 text-sm";

    const subUlClasses = "mt-1 w-64 p-4 space-y-2 hidden cursor-pointer";

    const submenuCl = (page : Page, param? : any ) =>{

        return  (isPage(page, param) || (currentPage &&  currentPage.page && (page === currentPage.page && param === currentPage.param)) )? 
        submenuClassesSel : submenuClasses
    }

    return  <nav className="px-4 py-6 bg-gradient-to-r from-gray-600 to-gray-700 h-full">

    <div className="m-1">
        <img src={logo} style={{width:"120px"}} className="h-auto ml-4"/>
    </div>

    <ul className="space-y-4">
        <li className="mt-4 mb-4 p-2">
            <a onClick={()=>{
                expandSubMenu("for_creators");
            }} className="block text-gray-400 hover:text-white cursor-pointer">
                <div className="inline-flex text-left p-2 bg-gray-800 w-full">
                <IoCreateOutline className="mr-2 mt-1"/>For Creators
                <FcNext style={{width:"16px",height:"16px"}} className="ml-10 mr-2 mt-1"/>
                </div>
            </a>

            <ul id="for_creators" className={subUlClasses}>
                <li>
                    <a onClick={()=>{
                        setPage(Page.CreateCollection, CollectionViewType.LIST);
                    }} className={submenuCl(Page.CreateCollection, 
                    CollectionViewType.LIST)}>Manage Collections</a>
                </li>

                <li>
                    <a onClick={()=>{
                        setPage(Page.CreateCollection, CollectionViewType.CREATE);
                    }} className={submenuCl(Page.CreateCollection, 
                    CollectionViewType.CREATE)}>Create Collection</a>
                </li>
            </ul>
        </li>

        <li className="mt-4 mb-4 p-2">
            <a onClick={()=>{
                expandSubMenu("for_collectors");
            }} className="block text-gray-400 hover:text-white cursor-pointer">
                <div className="inline-flex text-left p-2 bg-gray-800 w-full">    
                <FiGift className="mr-2 mt-1"/>For Collectors
                <FcNext style={{width:"16px",height:"16px"}} className="ml-8 mr-2 mt-1"/>
            </div>
            </a>

            <ul id="for_collectors"  className={subUlClasses}>
                <li>
                    <a onClick={()=>{
                        setPage(Page.Collectibles, CollectiblesViewType.COLLECTIBLES);
                    }} className={submenuCl(Page.Collectibles, CollectiblesViewType.COLLECTIBLES)}>Your Collectibles</a>
                </li>
                <li>
                    <a onClick={()=>{
                        setPage(Page.Collectibles, CollectiblesViewType.MINT_FROM_NBH);
                    }} className={submenuCl(Page.Collectibles, CollectiblesViewType.MINT_FROM_NBH)}>Mint From Neighborhood</a>
                </li>
                <li>
                    <a onClick={()=>{
                        setPage(Page.Collectibles, CollectiblesViewType.SIMPLE_MINT);
                    }} className={submenuCl(Page.Collectibles, CollectiblesViewType.SIMPLE_MINT)}>Simple Mint</a>
                </li>
 
            </ul>
     
        </li>

        <li className="mt-4 mb-4 p-2">
            <a onClick={()=>{
                expandSubMenu("market");
            }} className="block text-gray-400 hover:text-white cursor-pointer">
                <div className="inline-flex text-left p-2 bg-gray-800 w-full">    
                <FiShoppingCart className="mr-2 mt-1"/>Market
                <FcNext style={{width:"16px",height:"16px"}} className="ml-20 mr-2 mt-1"/>
            </div>
            </a>

            <ul id="market"  className={subUlClasses}>
                <li>
                    <a onClick={()=>{
                        setPage(Page.Market, MarketViewType.MARKET);
                    }} className={submenuCl(Page.Market, MarketViewType.MARKET)}>Buy NFT</a>
                </li>
                <li>
                    <a onClick={()=>{
                        setPage(Page.Market, MarketViewType.YOUR_BUY_OFFERS);
                    }} className={submenuCl(Page.Market, MarketViewType.YOUR_BUY_OFFERS)}>Your Buy Offers</a>
                </li>
                <li>
                    <a onClick={()=>{
                        setPage(Page.Market, MarketViewType.YOUR_SELL_OFFERS);
                    }} className={submenuCl(Page.Market, MarketViewType.YOUR_SELL_OFFERS)}>Your Sell Offers</a>
                </li>
            </ul>
     
        </li>

        <li className="mt-4 mb-4 p-2">
            <a className="block text-gray-400 hover:text-white cursor-pointer">
                Documentations
            </a>
        </li>

        <li className="mt-4 mb-4 p-2">
            <a href ="https://github.com/pix0-labs" target="_blank" className="block text-gray-400 hover:text-white cursor-pointer">
                GitHub
            </a>
        </li>
    </ul>

    </nav>
}