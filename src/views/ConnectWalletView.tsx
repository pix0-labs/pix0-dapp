import { FC} from "react";
import { ConnectButton } from "pix0-react2-arch-test";
import useWalletState from "../hooks/useWalletState";
import logo from '../images/pix0_logo1.png';


export const ConnectWalletView : FC = () =>{


    const {setWalletConnected} = useWalletState();

    return <div className="text=center p-8 mx-auto my-auto w-32"> 
     <div>
        <img src={logo} className="w-128 h-auto mx-auto"/>
    </div>

    <ConnectButton connectedCallback={()=>{
        
        setWalletConnected();
    
    }}/>
    </div>
}