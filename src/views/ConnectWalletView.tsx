import { FC, useState} from "react";
import { CommonAnimatedDiv } from "./components/CommonAnimatedDiv";
import { ConnectButton } from "pix0-react";
import useWalletState from "../hooks/useWalletState";
import logo from '../images/pix0_logo1.png';


export const ConnectWalletView : FC = () =>{

    const [error, setError] = useState<Error>();

    const {setWalletConnected} = useWalletState();

    return <CommonAnimatedDiv className="p-2 mt-20 w-3/5 h-3/5 rounded-3xl bg-gradient-to-b 
    from-gray-800 to-gray-600 mx-auto text-center"> 
    <CommonAnimatedDiv visible={error!==undefined} dismissAfterInSeconds={6}
    className="mx-auto bg-red-600 text-gray-100 rounded-3xl 
    p-2 w-11/12 m-2 font-bold">{error?.message}</CommonAnimatedDiv>
    <img src={logo} className="h-auto mx-auto mb-4 mt-10" style={{minWidth:"220px"}}/>
    <ConnectButton experimental={true}
    className="p-2 mt-10 mb-10 bg-gray-800 w-3/5 hover:bg-cyan-900 
    rounded-3xl mx-auto text-gray-100 font-bold"
    onError={(e)=>{
        setError(e);

        setTimeout(()=>{
            setError(undefined);
        },5000);
    }}
    connectedCallback={()=>{    
        setWalletConnected();
    }}/>
    <CommonAnimatedDiv className="mt-4 text-gray-100 text-sm font-bold"
    duration={3}>Now Live On Arhcway Testnet</CommonAnimatedDiv>
    <div className="mt-4 text-gray-100 text-xs"><a href="https://docs.pix0.xyz" 
    target="_blank">Documentations</a></div>
    </CommonAnimatedDiv>
}