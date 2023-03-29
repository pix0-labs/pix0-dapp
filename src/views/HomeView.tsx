import { FC } from "react";
import { SideBar } from "./SideBar";
import { MainView } from "./MainView";
import { ToggleButton } from "./components/ToggleButton";
import './css/SideBar.css';

export const HomeView : FC = () =>{

    return  <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <aside className="sidebar w-0 lg:w-32 md:shadow ASideBar">
            <SideBar/>
        </aside>
        <main className="main flex flex-col grow md:ml-0 h-screen mx-auto bg-black">
            <MainView/>
        </main>
        <ToggleButton/>
      </div> ;
}