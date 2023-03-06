import { FC, useEffect, useState} from "react";
import { SideBar } from "./SideBar";
import { MainView } from "./MainView";
import './css/SideBar.css';

export const HomeView : FC = () =>{

    return  <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <aside className="sidebar w-0 lg:w-32 md:shadow transform -translate-x-full 
        sm:translate-x-0 transition-transform duration-150 ease-in bg-gray-800 ASideBar">
            <SideBar/>
        </aside>
        <main className="main flex flex-col grow md:ml-0 
        transition-all duration-250 ease-in mx-auto">
            <MainView/>
        </main>
      </div> ;
}