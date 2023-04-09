import { FC, useState } from "react";
import { SideBar } from "./SideBar2";
import { MainView } from "./MainView";
import { AnimatedDiv2 } from "./components/AnimatedDiv2";
import { ToggleButton } from "./components/ToggleButton";
import './css/SideBar.css';

export const HomeView : FC = () =>{


    const [sideBarVisible, setSideBarVisible] = useState(true);


    const hideOrExpandSideBar = () =>{

        setSideBarVisible(!sideBarVisible);
    }


    return  <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <AnimatedDiv2 isVisible={sideBarVisible}> 
        <aside id="sideBarId" className="sidebar w-0 lg:w-32 md:shadow ASideBar overflow-y-auto">
        <SideBar/>
        </aside>
        </AnimatedDiv2>
        <main className="main flex flex-col grow md:ml-0 h-screen mx-auto bg-black text-center overflow-y-auto">
            <MainView/>
        </main>
        <ToggleButton onClick={hideOrExpandSideBar}/>
        
      </div> ;
}