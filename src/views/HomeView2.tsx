import { FC } from "react";
import { SideBar } from "./SideBar2";
import { MainView } from "./MainView";
import './css/Home2.css';

export const HomeView : FC = () =>{


    const toggleClick = () =>{

        const menuToggle = document.getElementById("menu-toggle");
        const menu = document.querySelector(".fixed");

        if (menuToggle !== null) {
            const menuIcon = menuToggle.querySelector(".menu");
            if (menu !== null)
                menu.classList.toggle("-translate-x-full");
            
            if (menuIcon !== null )
                menuIcon.classList.toggle("menu-open");
        }
    }

   
    const toggleButton =  <button id="menu-toggle" className="text-white lg:hidden"
    onClick={(e)=>{
        e.preventDefault();
        toggleClick();
    }}>
    <svg viewBox="0 0 20 20" fill="white" className="menu w-6 h-6">
    <path fill-rule="evenodd" d="M3 9h14a1 1 0 110 2H3a1 1 0 110-2zm0-4h14a1 1 0 110 2H3a1 1 0 110-2zm0 8h14a1 1 0 110 2H3a1 1 0 110-2z" clip-rule="evenodd" />
    </svg>
    </button>;


    return <div className="flex">
            <div className="fixed z-10 inset-y-0 left-0 w-64 bg-gray-900 overflow-y-auto 
            transition duration-300 transform translate-x-[-100%] lg:translate-x-0 lg:static lg:inset-0 items-stretch">
                <SideBar/>
            </div>
        
            <div className="flex-1">
                <div className="flex items-center justify-center h-screen w-full">
                {toggleButton}
                <MainView/>
                </div>
            </div>
        </div>
}