import { FC, useState } from "react";
import { SideBar } from "./SideBar2";
//import { MainView } from "./MainView";
import { AllRoutes } from "./AllRoutes";
import { AnimatedDiv2 } from "./components/AnimatedDiv2";
import { ToggleButton } from "./components/ToggleButton";
import './css/SideBar.css';

export const HomeView : FC = () =>{


    const [sideBarVisible, setSideBarVisible] = useState(true);


    const hideOrExpandSideBar = () =>{

        let e = document.getElementById("sideBarId");
        let e2 = document.getElementById("toggleButtId");
        
        if (sideBarVisible) {

            setSideBarVisible(false);

            e?.classList.remove("ASideBarShow");
            e2?.classList.remove("toggleButt"); 
        }
        else {

            setSideBarVisible(true);
            e?.classList.add("ASideBarShow");
            e2?.classList.add("toggleButt");
       
        }
    }


    return  <div className="flex flex-row min-h-screen text-gray-800">
        <ToggleButton onClick={hideOrExpandSideBar}/>
        <AnimatedDiv2 isVisible={sideBarVisible}> 
        <div id="sideBarId" className="w-0 lg:w-32 md:shadow ASideBar overflow-y-auto overflow-x-hidden">
        <SideBar/>
        </div>
        </AnimatedDiv2>
        <main className="main flex flex-col grow md:ml-0 h-screen mx-auto bg-black text-center overflow-y-auto overflow-x-hidden">
            <AllRoutes/>
        </main>  
      </div> ;
}